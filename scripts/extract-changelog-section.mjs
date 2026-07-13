#!/usr/bin/env node
/**
 * Extract a version section from CHANGELOG.md for GitHub Releases.
 *
 * Usage:
 *   node scripts/extract-changelog-section.mjs 1.5.3
 *   node scripts/extract-changelog-section.mjs v1.5.3 > /tmp/notes.md
 *
 * Prints markdown suitable as a GitHub Release body (Fixed / Added / Notes).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const changelogPath = path.join(root, "CHANGELOG.md");

function normalizeVersion(input) {
  const raw = String(input || "").trim();
  if (!raw) return "";
  return raw.startsWith("v") ? raw.slice(1) : raw;
}

function previousSemver(ver) {
  const parts = ver.split(".").map((n) => Number(n));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;
  let [a, b, c] = parts;
  if (c > 0) return `${a}.${b}.${c - 1}`;
  if (b > 0) return `${a}.${b - 1}.0`;
  if (a > 0) return `${a - 1}.0.0`;
  return null;
}

function extractSection(changelog, version) {
  const headerRe = new RegExp(
    `^## \\[${version.replace(/\./g, "\\.")}\\][^\\n]*\\n`,
    "m",
  );
  const start = changelog.search(headerRe);
  if (start < 0) return null;
  const afterHeader = changelog.slice(start).replace(headerRe, "");
  const next = afterHeader.search(/^## \[/m);
  const body = (next < 0 ? afterHeader : afterHeader.slice(0, next)).trim();
  return body;
}

const version = normalizeVersion(process.argv[2] || process.env.VERSION || "");
if (!version) {
  console.error("Usage: extract-changelog-section.mjs <version|vVersion>");
  process.exit(2);
}

if (!fs.existsSync(changelogPath)) {
  console.error(`CHANGELOG.md not found at ${changelogPath}`);
  process.exit(1);
}

const changelog = fs.readFileSync(changelogPath, "utf8");
const body = extractSection(changelog, version);
if (!body) {
  console.error(`No CHANGELOG section found for [${version}]`);
  process.exit(1);
}

const prev = previousSemver(version);
const compare =
  prev != null
    ? `\n\n---\n\n**Full Changelog**: https://github.com/chao2hang/chaos-ui/compare/v${prev}...v${version}\n`
    : "\n";

process.stdout.write(`## [${version}]\n\n${body}${compare}`);
