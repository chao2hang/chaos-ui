#!/usr/bin/env node
/**
 * Static scan: MDX live embeds that pass function handlers / bare identifiers
 * into client components (RSC will 500: "Event handlers cannot be passed…").
 *
 * Code fences and <CodeBlock> bodies are ignored.
 *
 * Usage:
 *   node scripts/check-docs-mdx-live.mjs
 *   node scripts/check-docs-mdx-live.mjs --fail
 *   node scripts/check-docs-mdx-live.mjs --json
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "apps/docs/@/content");
const args = new Set(process.argv.slice(2));
const fail = args.has("--fail");
const asJson = args.has("--json");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (name.endsWith(".mdx")) out.push(full);
  }
  return out;
}

/** Strip ``` fences and <CodeBlock …> / </CodeBlock> / self-closing with template code. */
function stripCodeRegions(text) {
  let t = text.replace(/```[\s\S]*?```/g, "");
  const out = [];
  let i = 0;
  while (i < t.length) {
    const start = t.indexOf("<CodeBlock", i);
    if (start < 0) {
      out.push(t.slice(i));
      break;
    }
    out.push(t.slice(i, start));
    let k = start + "<CodeBlock".length;
    let brace = 0;
    let inTick = false;
    while (k < t.length) {
      if (t.startsWith("</CodeBlock>", k)) {
        k += "</CodeBlock>".length;
        break;
      }
      if (t.startsWith("/>", k) && brace === 0) {
        k += 2;
        break;
      }
      const ch = t[k];
      if (ch === "`") inTick = !inTick;
      if (!inTick) {
        if (ch === "{") brace++;
        else if (ch === "}") brace = Math.max(0, brace - 1);
      }
      k++;
    }
    i = k;
  }
  return out.join("");
}

function scanFile(file) {
  const text = fs.readFileSync(file, "utf8");
  const body = stripCodeRegions(text);
  const handlers = [];
  const re = /\bon([A-Z][A-Za-z0-9]*)=\{([^}]{0,120})\}/g;
  let m;
  while ((m = re.exec(body))) {
    const expr = m[2].trim();
    const risky =
      /=>|function|async|console\./.test(expr) ||
      (/^[a-zA-Z_$][\w$]*$/.test(expr) &&
        !["true", "false", "null", "undefined"].includes(expr));
    if (risky) handlers.push({ prop: `on${m[1]}`, expr: expr.slice(0, 80) });
  }
  const undef = [
    ...body.matchAll(
      /(?<![\w$])\{(open|setOpen|setTab|set[A-Z]\w*|edit|del)\}(?![\w$])/g,
    ),
  ].map((x) => x[1]);
  if (!handlers.length && !undef.length) return null;
  return {
    file: path.relative(ROOT, file).split(path.sep).join("/"),
    handlers,
    undef: [...new Set(undef)],
  };
}

const files = walk(CONTENT);
const hits = [];
for (const f of files) {
  const hit = scanFile(f);
  if (hit) hits.push(hit);
}

if (asJson) {
  console.log(JSON.stringify({ scanned: files.length, hits }, null, 2));
} else {
  console.log(
    `Docs MDX live-handler scan: ${files.length} files, ${hits.length} risky`,
  );
  for (const h of hits) {
    console.log(`  ${h.file}`);
    if (h.handlers.length) {
      console.log(
        `    handlers: ${h.handlers.map((x) => `${x.prop}={${x.expr}}`).join("; ")}`,
      );
    }
    if (h.undef.length) console.log(`    undef: ${h.undef.join(", ")}`);
  }
  if (!hits.length) console.log("OK: no live MDX handlers outside CodeBlock.");
}

if (fail && hits.length) process.exitCode = 1;
