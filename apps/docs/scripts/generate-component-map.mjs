#!/usr/bin/env node
/**
 * generate-component-map.mjs
 *
 * Scans `@/content/components.meta.ts` and `@/components/**` to produce
 * `@/components/component-map.ts` — a name→Component lookup table so the
 * docs detail page can render live component previews.
 *
 * Usage:  node apps/docs/scripts/generate-component-map.mjs
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from "fs";
import { resolve, dirname, basename, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../../..");
const DOCS = resolve(ROOT, "apps/docs");
const META_PATH = resolve(DOCS, "@/content/components.meta.ts");
const COMPONENTS_DIR = resolve(DOCS, "@/components");
const OUTPUT_PATH = resolve(DOCS, "@/components/component-map.ts");

/* -------------------------------------------------------------------------- */
/*  Parse components.meta.ts                                                  */
/* -------------------------------------------------------------------------- */

function parseMeta() {
  const src = readFileSync(META_PATH, "utf-8");

  // Find the array start
  const arrayStart = src.indexOf("components: ComponentMeta[] = [");
  if (arrayStart === -1) throw new Error("Cannot find components array in meta file");

  const body = src.slice(arrayStart);

  // Match slug, name, sourcePath — the three fields we need
  const entryRe = /\{\s*slug:\s*["']([^"']+)["'][\s\S]*?name:\s*["']([^"']+)["'][\s\S]*?sourcePath:\s*["']([^"']+)["']/g;

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
/*  Find actual export names from source file                                 */
/* -------------------------------------------------------------------------- */

function findExports(filePath) {
  if (!existsSync(filePath)) return { primary: null, all: [] };

  const content = readFileSync(filePath, "utf-8");
  const names = new Set();

  // export { A, B, C }
  const exportListRe = /export\s*\{\s*([^}]*)\}/g;
  let m;
  while ((m = exportListRe.exec(content)) !== null) {
    for (const part of m[1].split(",")) {
      const name = part.trim().split(/\s+/)[0]; // "X as Y" → "X"
      if (name && /^[A-Z]/.test(name)) names.add(name);
    }
  }

  // export function / export const / export class
  const directRe = /export\s+(?:function|const|class)\s+(\w+)/g;
  while ((m = directRe.exec(content)) !== null) {
    names.add(m[1]);
  }

  const all = [...names];

  // Determine the "primary" export: prefer name matching the file basename
  const fileBase = basename(filePath, ".tsx");
  const kebabToPascal = (s) =>
    s
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("");

  // Try exact match with filename
  let primary = all.find((n) => n.toLowerCase() === kebabToPascal(fileBase).toLowerCase()) || null;

  // If no match, prefer the first name that looks like the main component
  // (not *Variants, *Provider, *Context, etc.)
  if (!primary) {
    primary = all.find((n) => !/Variants?$|Provider$|Context$|Styles$/.test(n)) || all[0] || null;
  }

  return { primary, all };
}

/* -------------------------------------------------------------------------- */
/*  Generate the import map                                                   */
/* -------------------------------------------------------------------------- */

function generate() {
  const entries = parseMeta();
  console.log(`Parsed ${entries.length} component entries from components.meta.ts`);

  const imports = [];
  const mapEntries = [];
  const skipped = [];

  for (const entry of entries) {
    // Convert sourcePath to local docs path
    // components/ui/button.tsx -> ui/button
    const relPath = entry.sourcePath.replace(/^components\//, "").replace(/\.tsx?$/, "");

    const fullPath = join(COMPONENTS_DIR, relPath + ".tsx");
    const { primary, all } = findExports(fullPath);

    if (!primary) {
      skipped.push(`${entry.name} (${relPath}): no exports found`);
      continue;
    }

    // Generate import alias if meta.name differs from actual export
    const importName = primary;
    const mapName = entry.name;

    let importStmt;
    if (importName === mapName) {
      importStmt = `import { ${importName} } from "@/components/${relPath}";`;
    } else if (importName.toLowerCase() === mapName.toLowerCase()) {
      // Case-only difference — alias it
      importStmt = `import { ${importName} as ${mapName} } from "@/components/${relPath}";`;
    } else {
      // Different name entirely — alias it
      importStmt = `import { ${importName} as ${mapName} } from "@/components/${relPath}";`;
      console.log(`  Alias: ${importName} → ${mapName} (${relPath})`);
    }

    imports.push(importStmt);
    mapEntries.push(`  ${mapName},`);
  }

  // Report skipped
  if (skipped.length > 0) {
    console.log(`\nSkipped ${skipped.length} components (no exports):`);
    for (const s of skipped) console.log(`  - ${s}`);
  }

  // Build the output file
  const output = `// Auto-generated by scripts/generate-component-map.mjs. Do not edit manually.
// Maps PascalCase component names to their React component implementations.
// Used by the component detail page to render live previews.

${imports.join("\n")}

export const componentMap: Record<string, React.ComponentType<any>> = {
${mapEntries.join("\n")}
};
`;

  writeFileSync(OUTPUT_PATH, output, "utf-8");
  console.log(`\nGenerated ${OUTPUT_PATH}`);
  console.log(`  ${imports.length} imports, ${mapEntries.length} map entries`);
}

/* -------------------------------------------------------------------------- */
/*  Main                                                                      */
/* -------------------------------------------------------------------------- */

generate();
