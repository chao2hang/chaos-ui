#!/usr/bin/env node
/**
 * generate-component-loader.mjs
 *
 * Generates `@/components/component-loader.ts` — a lazy-loading map of
 * component name → package export. Each entry is a separate `dynamic()`
 * import from `@chaos_team/chaos-ui/{ui,business,layout,mobile}` so Turbopack
 * can code-split previews.
 *
 * Source of truth for exports is monorepo `components/**` (not apps/docs shims).
 *
 * Usage:  node apps/docs/scripts/generate-component-loader.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../../..");
const DOCS = resolve(ROOT, "apps/docs");
const META_PATH = resolve(DOCS, "@/content/components.meta.ts");
const PACKAGE_COMPONENTS_DIR = resolve(ROOT, "components");
const OUTPUT_PATH = resolve(DOCS, "@/components/component-loader.ts");

/* -------------------------------------------------------------------------- */
/*  Parse components.meta.ts                                                  */
/* -------------------------------------------------------------------------- */

function parseMeta() {
  const src = readFileSync(META_PATH, "utf-8");
  const arrayStart = src.indexOf("components: ComponentMeta[] = [");
  if (arrayStart === -1) throw new Error("Cannot find components array");
  const body = src.slice(arrayStart);
  const entryRe =
    /\{\s*slug:\s*["']([^"']+)["'][\s\S]*?name:\s*["']([^"']+)["'][\s\S]*?sourcePath:\s*["']([^"']+)["']/g;
  const entries = [];
  let m;
  while ((m = entryRe.exec(body)) !== null) {
    entries.push({ slug: m[1], name: m[2], sourcePath: m[3] });
  }
  return entries;
}

/* -------------------------------------------------------------------------- */
/*  Package subpath + primary export                                          */
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
      // "X as Y" → prefer exported binding Y if present, else X
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
    s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");

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
  // meta: components/ui/button.tsx → ROOT/components/ui/button.tsx
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
  console.log(`Parsed ${entries.length} component entries`);

  const loaders = [];
  const businessNames = [];
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
      skipped.push(`${entry.name} (${entry.sourcePath}): no exports`);
      continue;
    }

    if (primary !== entry.name) {
      console.log(`  Alias: ${primary} → ${entry.name}`);
    }

    loaders.push(
      `  ${entry.name}: dynamic(
    () =>
      import("${pkg}").then((m) => ({
        default: m.${primary},
      })),
    { ssr: false },
  ),`,
    );

    if (entry.sourcePath.includes("/business/")) {
      businessNames.push(`"${entry.name}"`);
    }
  }

  if (skipped.length > 0) {
    console.log(`\nSkipped ${skipped.length}:`);
    for (const s of skipped) console.log(`  - ${s}`);
  }

  const output = `// @ts-nocheck — generated
// Auto-generated by scripts/generate-component-loader.mjs. Do not edit manually.
// Lazy-loading component map from package subpaths.

"use client";

import dynamic from "next/dynamic";

export const componentLoaders: Record<string, React.ComponentType<any>> = {
${loaders.join("\n")}
};

/**
 * Names of business components that require concrete data props to render.
 * The preview host uses this set to skip bare instantiation for names that
 * are NOT covered by a hand-authored fixture in \`component-previews.tsx\`.
 */
export const businessComponentNames: ReadonlySet<string> = new Set([
${businessNames.map((n) => `  ${n},`).join("\n")}
]);
`;

  writeFileSync(OUTPUT_PATH, output, "utf-8");
  console.log(`\nGenerated ${OUTPUT_PATH}`);
  console.log(`  ${loaders.length} loader entries`);
  console.log(`  ${businessNames.length} business names`);
}

generate();
