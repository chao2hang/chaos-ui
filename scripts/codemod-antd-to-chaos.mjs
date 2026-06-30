/**
 * Codemod scaffold: antd → chaos-ui migration
 *
 * This is a starting point for automated migration.
 * Run with: npx tsx scripts/codemod-antd-to-chaos.mjs <path>
 *
 * Supported transformations:
 * - Import paths: `antd` → `@qxyfoods/chaos-ui`
 * - Component names: Modal → Dialog, Tag → Chip, etc.
 */

import fs from "node:fs";
import path from "node:path";

const componentMap: Record<string, string> = {
  Modal: "Dialog",
  Tag: "Chip",
  Spin: "Spin",
  Empty: "EmptyState",
  Result: "ErrorPage",
  Steps: "Stepper",
  Rate: "Rating",
  Segmented: "SegmentedControl",
  FloatButton: "Fab",
  BackTop: "BackTop",
};

const importMap: Record<string, string> = {
  antd: "@qxyfoods/chaos-ui",
  "@ant-design/icons": "@qxyfoods/chaos-ui/ui/icons",
};

function transformContent(content: string): string {
  let result = content;

  // Replace imports
  for (const [from, to] of Object.entries(importMap)) {
    result = result.replace(
      new RegExp(`from ["']${from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "g"),
      `from "${to}"`,
    );
  }

  // Replace component names
  for (const [from, to] of Object.entries(componentMap)) {
    result = result.replace(new RegExp(`\\b${from}\\b`, "g"), to);
  }

  // Replace message.* with toast.*
  result = result.replace(/message\.(success|error|warning|info|loading)/g, "toast.$1");
  result = result.replace(/from ["']sonner["']/g, 'from "sonner"');

  return result;
}

function processFile(filePath: string): boolean {
  const content = fs.readFileSync(filePath, "utf-8");
  const transformed = transformContent(content);
  if (transformed !== content) {
    fs.writeFileSync(filePath, transformed);
    return true;
  }
  return false;
}

function walk(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules") {
      results.push(...walk(fullPath));
    } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

const target = process.argv[2];
if (!target) {
  console.error("Usage: node scripts/codemod-antd-to-chaos.mjs <path>");
  process.exit(1);
}

const files = fs.statSync(target).isDirectory() ? walk(target) : [target];
let changed = 0;
for (const file of files) {
  if (processFile(file)) {
    changed++;
    console.log("Modified:", file);
  }
}
console.log(`\nDone. ${changed} files modified.`);
