#!/usr/bin/env node
/**
 * Form control detail audit (plan: 2026-07-12_组件细节一致性检查与整改).
 *
 * Detects:
 * - Bare JSX <select> outside native-select.tsx / tests (R1)
 * - Suspected hand-styled default h-9 select/input rows (R2)
 * - Missing exception comments on bare selects
 *
 * Usage:
 *   node scripts/check-form-primitives.mjs
 *   node scripts/check-form-primitives.mjs --json
 *   node scripts/check-form-primitives.mjs --write docs/audit/form-details-baseline.md
 *   node scripts/check-form-primitives.mjs --fail-on-bare   # exit 1 if any non-allowlisted bare select
 *
 * Allowlist a file with a line comment:
 *   // native-select-exception: dense spreadsheet cell
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const COMPONENTS = path.join(ROOT, "components");
const EXCEPTION_RE = /native-select-exception\s*:/;
const BARE_SELECT_RE = /<select[\s>]/g;
const H9_FORM_RE =
  /h-9[^"'`\n]*(?:rounded-md|rounded-lg)[^"'`\n]*border[^"'`\n]*(?:px-2|px-3)/g;
const ALLOW_BASENAMES = new Set([
  "native-select.tsx",
  // tests may assert on select markup
]);

const args = new Set(process.argv.slice(2));
const writeIdx = process.argv.indexOf("--write");
const writePath =
  writeIdx >= 0 ? process.argv[writeIdx + 1] : null;
const asJson = args.has("--json");
const failOnBare = args.has("--fail-on-bare");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === "dist") continue;
      walk(full, out);
    } else if (name.endsWith(".tsx") || name.endsWith(".ts")) {
      out.push(full);
    }
  }
  return out;
}

function rel(p) {
  return path.relative(ROOT, p).split(path.sep).join("/");
}

function isSkipped(file) {
  const base = path.basename(file);
  if (ALLOW_BASENAMES.has(base)) return true;
  if (base.includes(".test.") || base.includes(".spec.")) return true;
  if (base.includes(".stories.")) return true;
  return false;
}

const files = walk(COMPONENTS).filter((f) => !isSkipped(f));
const bareSelects = [];
const h9Suspects = [];
const withNativeSelect = [];

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const r = rel(file);
  if (text.includes("NativeSelect")) withNativeSelect.push(r);

  const selectMatches = text.match(BARE_SELECT_RE);
  if (selectMatches?.length) {
    const allowed = EXCEPTION_RE.test(text);
    bareSelects.push({
      file: r,
      count: selectMatches.length,
      allowed,
    });
  }

  const h9 = text.match(H9_FORM_RE);
  if (h9?.length) {
    h9Suspects.push({ file: r, count: h9.length });
  }
}

const bareBlocked = bareSelects.filter((x) => !x.allowed);
const summary = {
  scannedFiles: files.length,
  bareSelectFiles: bareSelects.length,
  bareSelectTags: bareSelects.reduce((s, x) => s + x.count, 0),
  bareWithoutException: bareBlocked.length,
  bareWithException: bareSelects.filter((x) => x.allowed).length,
  h9SuspectFiles: h9Suspects.length,
  nativeSelectConsumers: withNativeSelect.length,
  bareSelects,
  h9Suspects,
  withNativeSelect,
};

if (asJson) {
  console.log(JSON.stringify(summary, null, 2));
} else {
  console.log("Form primitives check (components/)");
  console.log(`  scanned files:           ${summary.scannedFiles}`);
  console.log(
    `  bare <select> files:      ${summary.bareSelectFiles} (${summary.bareSelectTags} tags)`,
  );
  console.log(
    `    without exception:      ${summary.bareWithoutException}`,
  );
  console.log(
    `    with exception comment: ${summary.bareWithException}`,
  );
  console.log(`  h-9 form-style suspects:  ${summary.h9SuspectFiles}`);
  console.log(
    `  files using NativeSelect: ${summary.nativeSelectConsumers}`,
  );
  console.log("");
  if (bareSelects.length) {
    console.log("Bare <select> (R1):");
    for (const x of bareSelects.sort((a, b) =>
      a.file.localeCompare(b.file),
    )) {
      const mark = x.allowed ? "allow" : "NEED";
      console.log(`  [${mark}] ${x.file}  ×${x.count}`);
    }
    console.log("");
  }
  if (h9Suspects.length) {
    console.log("Suspected h-9 hand-styled form controls (R2):");
    for (const x of h9Suspects.sort((a, b) =>
      a.file.localeCompare(b.file),
    )) {
      console.log(`  ${x.file}  ×${x.count}`);
    }
    console.log("");
  }
  if (bareBlocked.length === 0) {
    console.log("OK: no unallowlisted bare <select>.");
  } else {
    console.log(
      `WARN: ${bareBlocked.length} file(s) still need NativeSelect/Select or exception comment.`,
    );
  }
}

if (writePath) {
  const lines = [
    "# Form details baseline",
    "",
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    "",
    "Source: `pnpm run check:form-details -- --write docs/audit/form-details-baseline.md`",
    "",
    "## Summary",
    "",
    `| Metric | Count |`,
    `|--------|------:|`,
    `| Scanned component files | ${summary.scannedFiles} |`,
    `| Files with bare \`<select>\` | ${summary.bareSelectFiles} |`,
    `| Bare select tags | ${summary.bareSelectTags} |`,
    `| Bare without exception | ${summary.bareWithoutException} |`,
    `| Bare with exception | ${summary.bareWithException} |`,
    `| h-9 hand-style suspects | ${summary.h9SuspectFiles} |`,
    `| NativeSelect consumers | ${summary.nativeSelectConsumers} |`,
    "",
    "## Bare `<select>` (R1)",
    "",
    "| File | Count | Exception |",
    "|------|------:|-----------|",
    ...bareSelects
      .sort((a, b) => a.file.localeCompare(b.file))
      .map(
        (x) =>
          `| \`${x.file}\` | ${x.count} | ${x.allowed ? "yes" : "**no**"} |`,
      ),
    "",
    "## h-9 hand-style suspects (R2)",
    "",
    "| File | Hits |",
    "|------|-----:|",
    ...h9Suspects
      .sort((a, b) => a.file.localeCompare(b.file))
      .map((x) => `| \`${x.file}\` | ${x.count} |`),
    "",
    "## Notes",
    "",
    "- Plan: `designs/2026-07-12_组件细节一致性检查与整改_设计计划.md`",
    "- Exception marker: `// native-select-exception: <reason>`",
    "- P0 targets: form-dialog, filter-bar, stock-transfer-dialog, meeting-room-booking, multi-currency-input, order-line-editor, expense-line-editor",
    "",
  ];
  const abs = path.isAbsolute(writePath)
    ? writePath
    : path.join(ROOT, writePath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, lines.join("\n"), "utf8");
  if (!asJson) console.log(`Wrote ${rel(abs)}`);
}

if (failOnBare && bareBlocked.length > 0) {
  process.exit(1);
}
