#!/usr/bin/env node
/**
 * create-shims.mjs
 *
 * Creates re-export shim files in apps/docs/@/components/ so that
 * story files from src/stories/ can be imported into the docs Next.js app.
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from "fs";
import { dirname, relative, resolve, sep, join, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../../..");
const DOCS = resolve(ROOT, "apps/docs");
const SHIM_BASE = resolve(DOCS, "@/components");

// All story source directories
const STORY_DIRS = [
  "src/stories/ui",
  "src/stories/business",
  "src/stories/layout",
  "apps/docs/src/components",
  "apps/docs/src/business",
  "apps/docs/src/layout",
];

function extractImports(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const imports = new Set();
  const re = /from\s+["']@\/components\/(ui|business|layout|mobile)\/([^"']+)["']/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    imports.add(JSON.stringify({ category: m[1], name: m[2] }));
  }
  return [...imports].map(s => JSON.parse(s));
}

function findActualComponent(category, name) {
  const direct = resolve(ROOT, "components", category, name + ".tsx");
  if (existsSync(direct)) return direct;

  // Try subdirectories for business components
  if (category === "business") {
    const subdirs = ["calendar", "charts", "charts/shared", "form"];
    for (const sub of subdirs) {
      const subPath = resolve(ROOT, "components", category, sub, name + ".tsx");
      if (existsSync(subPath)) return subPath;
    }
  }

  return null;
}

function getExports(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const exports = new Set();

  // export { Foo, Bar } or export { Foo as Default }
  const namedRe = /export\s*\{\s*([^}]+)\s*\}/g;
  let m;
  while ((m = namedRe.exec(content)) !== null) {
    m[1].split(",").forEach(part => {
      const name = part.trim().split(/\s+as\s+/)[0].trim();
      if (name && !name.startsWith("type")) exports.add(name);
    });
  }

  // export function Foo
  const funcRe = /export\s+function\s+(\w+)/g;
  while ((m = funcRe.exec(content)) !== null) {
    exports.add(m[1]);
  }

  // export const Foo
  const constRe = /export\s+const\s+(\w+)/g;
  while ((m = constRe.exec(content)) !== null) {
    exports.add(m[1]);
  }

  return [...exports];
}

function generateShim(actualPath, shimPath) {
  const exports = getExports(actualPath);
  if (exports.length === 0) return null;

  const shimDir = dirname(shimPath);
  let relPath = relative(shimDir, actualPath).split(sep).join("/");
  if (!relPath.startsWith(".")) relPath = "./" + relPath;
  relPath = relPath.replace(/\.(tsx|ts)$/, "");

  const lines = [`// Auto-generated shim — re-exports from ${relative(ROOT, actualPath)}`];
  lines.push(`export { ${exports.join(", ")} } from "${relPath}";`);
  lines.push("");

  return lines.join("\n") + "\n";
}

function main() {
  const missingShims = new Map();

  for (const storyDir of STORY_DIRS) {
    const absDir = resolve(ROOT, storyDir);
    if (!existsSync(absDir)) continue;

    let entries;
    try {
      entries = readdirSync(absDir, { withFileTypes: true });
    } catch (e) {
      console.error(`Error reading ${absDir}:`, e.message);
      continue;
    }

    for (const entry of entries) {
      if (!entry.isFile()) continue;
      if (!entry.name.endsWith(".stories.tsx") && !entry.name.endsWith(".stories.ts")) continue;

      const storyPath = join(absDir, entry.name);
      const imports = extractImports(storyPath);

      for (const imp of imports) {
        const shimName = imp.name.endsWith(".tsx") ? imp.name : imp.name + ".tsx";
        const shimPath = resolve(SHIM_BASE, imp.category, shimName);
        if (existsSync(shimPath)) continue;

        const actualPath = findActualComponent(imp.category, imp.name);
        if (actualPath && !missingShims.has(shimPath)) {
          missingShims.set(shimPath, actualPath);
        }
      }
    }
  }

  console.log(`Found ${missingShims.size} missing shims to create.`);

  let created = 0;
  let skipped = 0;

  for (const [shimPath, actualPath] of missingShims) {
    const shimDir = dirname(shimPath);
    if (!existsSync(shimDir)) {
      mkdirSync(shimDir, { recursive: true });
    }

    const content = generateShim(actualPath, shimPath);
    if (!content) {
      skipped++;
      continue;
    }

    writeFileSync(shimPath, content, "utf-8");
    created++;
  }

  console.log(`Created: ${created}, Skipped (no exports): ${skipped}`);
}

main();
