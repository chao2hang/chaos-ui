#!/usr/bin/env node
/**
 * HTTP smoke for docs component detail pages.
 *
 * Reads catalog from apps/docs/@/content/components.meta.ts and GETs each
 * /components/{category}/{slug} page.
 *
 * Failure markers (deliberately narrow — RSC flight payloads contain the
 * string "This page could not be found" even on healthy pages):
 *   - non-200 HTTP status
 *   - <title> starting with 404
 *   - Event handlers cannot be passed to Client Component props
 *   - Parsing ecmascript / Application error / Module not found
 *   - ReferenceError: / TypeError: in HTML body
 *   - very short body (< 500 bytes)
 *
 * Usage:
 *   node scripts/smoke-docs-components.mjs
 *   node scripts/smoke-docs-components.mjs --base http://10.10.10.10:3001
 *   node scripts/smoke-docs-components.mjs --concurrency 8 --timeout 120000
 *   node scripts/smoke-docs-components.mjs --write docs/audit/docs-component-detail-smoke.md
 *   node scripts/smoke-docs-components.mjs --json
 *   node scripts/smoke-docs-components.mjs --fail   # exit 1 if any bad page
 *
 * Env: DOCS_BASE (default http://127.0.0.1:3001)
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const META = path.join(
  ROOT,
  "apps/docs/@/content/components.meta.ts",
);

const args = process.argv.slice(2);
const argMap = new Map();
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (!a.startsWith("--")) continue;
  const key = a.slice(2);
  const next = args[i + 1];
  if (next && !next.startsWith("--")) {
    argMap.set(key, next);
    i++;
  } else {
    argMap.set(key, true);
  }
}

const BASE =
  argMap.get("base") ||
  process.env.DOCS_BASE ||
  "http://127.0.0.1:3001";
const concurrency = Number(argMap.get("concurrency") || 8);
const timeoutMs = Number(argMap.get("timeout") || 120_000);
const writePath = argMap.get("write") || null;
const asJson = argMap.has("json");
const failOnError = argMap.has("fail");

function categoryToPathSegment(category) {
  return String(category)
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function loadCatalog() {
  if (!fs.existsSync(META)) {
    throw new Error(`Missing catalog: ${META}`);
  }
  const text = fs.readFileSync(META, "utf8");
  const entries = [];
  const re =
    /\{\s*\n\s*slug:\s*"([^"]+)",\s*\n\s*name:\s*"([^"]+)",\s*\n\s*nameZh:\s*"([^"]*)",\s*\n\s*category:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(text))) {
    const [, slug, name, , category] = m;
    entries.push({
      slug,
      name,
      category,
      path: `/components/${categoryToPathSegment(category)}/${slug}`,
    });
  }
  if (entries.length === 0) {
    throw new Error("No component entries parsed from components.meta.ts");
  }
  return entries;
}

const ERROR_NEEDLES = [
  "Event handlers cannot be passed to Client Component props",
  "Parsing ecmascript source code failed",
  "Application error",
  "Unhandled Runtime Error",
  "Module not found",
  "ReferenceError:",
  "TypeError:",
];

async function checkOne(entry) {
  const url = BASE.replace(/\/$/, "") + entry.path;
  const t0 = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "user-agent": "chaos-ui-docs-smoke/1.0" },
    });
    const buf = Buffer.from(await res.arrayBuffer());
    const text = buf.toString("utf8");
    const ms = Date.now() - t0;
    const titleM = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleM ? titleM[1].replace(/\s+/g, " ").trim() : "";
    const issues = [];
    if (res.status !== 200) issues.push(`http_${res.status}`);
    if (/^404\b/.test(title) || title.startsWith("404:")) {
      issues.push("title_404");
    }
    for (const needle of ERROR_NEEDLES) {
      if (text.includes(needle)) {
        issues.push(needle.split(":")[0].slice(0, 48));
      }
    }
    if (buf.length < 500) issues.push(`short_body:${buf.length}`);
    return {
      path: entry.path,
      name: entry.name,
      category: entry.category,
      code: res.status,
      ms,
      bytes: buf.length,
      title,
      issues,
    };
  } catch (err) {
    return {
      path: entry.path,
      name: entry.name,
      category: entry.category,
      code: 0,
      ms: Date.now() - t0,
      bytes: 0,
      title: "",
      issues: [`error:${err?.name || "Error"}:${err?.message || err}`],
    };
  } finally {
    clearTimeout(timer);
  }
}

async function mapPool(items, limit, fn) {
  const results = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  const n = Math.min(limit, items.length);
  await Promise.all(Array.from({ length: n }, () => worker()));
  return results;
}

function writeReport(results, bad) {
  if (!writePath) return;
  const abs = path.isAbsolute(writePath)
    ? writePath
    : path.join(ROOT, writePath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  const ok = results.length - bad.length;
  const lat = results.map((r) => r.ms).sort((a, b) => a - b);
  const p95 = lat.length ? lat[Math.max(0, Math.floor(lat.length * 0.95) - 1)] : 0;
  const avg = lat.length
    ? Math.round(lat.reduce((s, x) => s + x, 0) / lat.length)
    : 0;
  const lines = [
    "# Docs component detail smoke",
    "",
    `Base: \`${BASE}\``,
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    `Source: \`pnpm run smoke:docs\``,
    "",
    `Total: **${results.length}**  OK: **${ok}**  Bad: **${bad.length}**`,
    `Avg ms: ${avg}  p95: ${p95}`,
    "",
    "Markers: HTTP status, title 404, RSC event-handler errors, parse errors, Application error, Module not found, ReferenceError/TypeError in HTML.",
    "(Note: raw string `This page could not be found` inside RSC flight payloads is **not** treated as failure.)",
    "",
  ];
  if (bad.length) {
    lines.push(
      "## Failures",
      "",
      "| Path | Code | ms | Issues | Title |",
      "|------|-----:|---:|--------|-------|",
    );
    for (const r of bad) {
      const issues = r.issues.join(", ").replace(/\|/g, "\\|");
      const title = (r.title || "").replace(/\|/g, "\\|").slice(0, 80);
      lines.push(
        `| \`${r.path}\` | ${r.code} | ${r.ms} | ${issues} | ${title} |`,
      );
    }
  } else {
    lines.push(
      "All component detail pages returned HTTP 200 without known error markers.",
    );
  }
  fs.writeFileSync(abs, lines.join("\n") + "\n", "utf8");
  console.log(`Wrote ${path.relative(ROOT, abs)}`);
}

async function main() {
  const catalog = loadCatalog();
  console.log(
    `Docs component smoke: ${catalog.length} pages → ${BASE} (concurrency=${concurrency})`,
  );

  let done = 0;
  const results = await mapPool(catalog, concurrency, async (entry) => {
    const r = await checkOne(entry);
    done++;
    if (done % 50 === 0 || done === catalog.length) {
      process.stdout.write(`  progress ${done}/${catalog.length}\n`);
    }
    return r;
  });

  results.sort((a, b) => a.path.localeCompare(b.path));
  const bad = results.filter((r) => r.issues.length > 0 || r.code !== 200);
  const ok = results.length - bad.length;
  const lat = results.map((r) => r.ms).sort((a, b) => a - b);
  const p95 = lat.length ? lat[Math.max(0, Math.floor(lat.length * 0.95) - 1)] : 0;
  const avg = lat.length
    ? Math.round(lat.reduce((s, x) => s + x, 0) / lat.length)
    : 0;

  const summary = {
    base: BASE,
    total: results.length,
    ok,
    bad: bad.length,
    avgMs: avg,
    p95Ms: p95,
    codes: results.reduce((acc, r) => {
      acc[r.code] = (acc[r.code] || 0) + 1;
      return acc;
    }, {}),
    badPaths: bad.map((r) => ({
      path: r.path,
      code: r.code,
      issues: r.issues,
    })),
  };

  if (asJson) {
    console.log(JSON.stringify({ summary, results }, null, 2));
  } else {
    console.log(
      `done: total=${results.length} ok=${ok} bad=${bad.length} avg_ms=${avg} p95_ms=${p95}`,
    );
    console.log("codes", summary.codes);
    for (const r of bad.slice(0, 40)) {
      console.log(
        `FAIL ${r.code} ${r.ms}ms ${r.path} :: ${r.issues.join(", ")}`,
      );
    }
    if (bad.length > 40) console.log(`... and ${bad.length - 40} more`);
  }

  writeReport(results, bad);

  if (failOnError && bad.length) {
    process.exitCode = 1;
  }
}

const isMain =
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isMain) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
