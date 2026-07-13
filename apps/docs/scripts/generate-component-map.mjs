#!/usr/bin/env node
/**
 * generate-component-map.mjs
 *
 * Scans `@/content/components.meta.ts` and monorepo `components/**` to produce
 * `@/components/component-map.ts` — a name→Component lookup from package
 * subpaths (`@chaos_team/chaos-ui/{ui,business,layout,mobile}`).
 *
 * Source of truth is package source under repo-root `components/`, not docs shims.
 *
 * Usage:  node apps/docs/scripts/generate-component-map.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../../..");
const DOCS = resolve(ROOT, "apps/docs");
const META_PATH = resolve(DOCS, "@/content/components.meta.ts");
const OUTPUT_PATH = resolve(DOCS, "@/components/component-map.ts");

/* -------------------------------------------------------------------------- */
/*  Parse components.meta.ts                                                  */
/* -------------------------------------------------------------------------- */

function parseMeta() {
  const src = readFileSync(META_PATH, "utf-8");
  const arrayStart = src.indexOf("components: ComponentMeta[] = [");
  if (arrayStart === -1) throw new Error("Cannot find components array in meta file");

  const body = src.slice(arrayStart);
  const entryRe =
    /\{\s*slug:\s*["']([^"']+)["'][\s\S]*?name:\s*["']([^"']+)["'][\s\S]*?sourcePath:\s*["']([^"']+)["']/g;

  const entries = [];
  let m;
  while ((m = entryRe.exec(body)) !== null) {
    entries.push({
      slug: m[1],
      name: m[2],
      sourcePath: m[3],
    });
  }
  return entries;
}

/* -------------------------------------------------------------------------- */
/*  Package subpath + exports                                                 */
/* -------------------------------------------------------------------------- */

function packageSubpath(sourcePath) {
  if (sourcePath.includes("/business/")) return "@chaos_team/chaos-ui/business";
  if (sourcePath.includes("/layout/")) return "@chaos_team/chaos-ui/layout";
  if (sourcePath.includes("/mobile/")) return "@chaos_team/chaos-ui/mobile";
  if (sourcePath.includes("/ui/")) return "@chaos_team/chaos-ui/ui";
  return null;
}

function findPrimaryExport(filePath, preferredName) {
  if (!existsSync(filePath)) return null;
  const content = readFileSync(filePath, "utf-8");
  const names = new Set();

  const exportListRe = /export\s*\{\s*([^}]*)\}/g;
  let m;
  while ((m = exportListRe.exec(content)) !== null) {
    for (const part of m[1].split(",")) {
      const trimmed = part.trim();
      if (!trimmed || trimmed.startsWith("type ")) continue;
      const asMatch = trimmed.match(/^(\w+)\s+as\s+(\w+)$/);
      if (asMatch) {
        names.add(asMatch[2]);
        names.add(asMatch[1]);
      } else {
        const name = trimmed.split(/\s+/)[0];
        if (name && /^[A-Z]/.test(name)) names.add(name);
      }
    }
  }

  const directRe = /export\s+(?:function|const|class)\s+(\w+)/g;
  while ((m = directRe.exec(content)) !== null) {
    names.add(m[1]);
  }

  const all = [...names];
  if (preferredName && all.includes(preferredName)) return preferredName;

  const fileBase = basename(filePath, ".tsx");
  const kebabToPascal = (s) =>
    s
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("");

  let primary =
    all.find((n) => n.toLowerCase() === kebabToPascal(fileBase).toLowerCase()) ||
    null;
  if (!primary) {
    primary =
      all.find((n) => !/Variants?$|Provider$|Context$|Styles$/.test(n)) ||
      all[0] ||
      null;
  }
  return primary;
}

function resolveSourceFile(sourcePath) {
  const abs = resolve(ROOT, sourcePath);
  if (existsSync(abs)) return abs;
  const tsx = abs.endsWith(".tsx") ? abs : `${abs}.tsx`;
  if (existsSync(tsx)) return tsx;
  return abs;
}

/* -------------------------------------------------------------------------- */
/*  Generate                                                                  */
/* -------------------------------------------------------------------------- */

function generate() {
  const entries = parseMeta();
  console.log(`Parsed ${entries.length} component entries from components.meta.ts`);

  const imports = [];
  const mapEntries = [];
  const skipped = [];
  const seen = new Set();

  for (const entry of entries) {
    if (seen.has(entry.name)) continue;
    seen.add(entry.name);

    const pkg = packageSubpath(entry.sourcePath);
    if (!pkg) {
      skipped.push(`${entry.name} (${entry.sourcePath}): unknown package`);
      continue;
    }

    const fullPath = resolveSourceFile(entry.sourcePath);
    const primary = findPrimaryExport(fullPath, entry.name);

    if (!primary) {
      skipped.push(`${entry.name} (${entry.sourcePath}): no exports found`);
      continue;
    }

    let importStmt;
    if (primary === entry.name) {
      importStmt = `import { ${primary} } from "${pkg}";`;
    } else {
      importStmt = `import { ${primary} as ${entry.name} } from "${pkg}";`;
      console.log(`  Alias: ${primary} → ${entry.name}`);
    }

    imports.push(importStmt);
    mapEntries.push(`  ${entry.name},`);
  }

  if (skipped.length > 0) {
    console.log(`\nSkipped ${skipped.length} components:`);
    for (const s of skipped) console.log(`  - ${s}`);
  }

  const output = `// @ts-nocheck — generated
// Auto-generated by scripts/generate-component-map.mjs. Do not edit manually.
// Maps PascalCase component names to package implementations for live previews.

${imports.join("\n")}

export const componentMap: Record<string, React.ComponentType<any>> = {
${mapEntries.join("\n")}
};
`;

  writeFileSync(OUTPUT_PATH, output, "utf-8");
  console.log(`\nGenerated ${OUTPUT_PATH}`);
  console.log(`  ${imports.length} imports, ${mapEntries.length} map entries`);
}

generate();
