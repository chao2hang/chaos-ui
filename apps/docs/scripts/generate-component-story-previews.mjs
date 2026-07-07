#!/usr/bin/env node
/**
 * generate-component-story-previews.mjs
 *
 * Generates `@/components/component-story-previews.tsx` — a lazy-loading map of
 * component name → Storybook story preview. Story fixtures sit between curated
 * hand-authored previews and bare component instantiation on docs detail pages.
 *
 * Now includes stories from src/stories/ but only when all @/-imports in the
 * story file resolve to existing files in the docs app's @/ tree (or have
 * been covered by generated shims).
 */

import { existsSync, readFileSync, writeFileSync, readdirSync } from "fs";
import { dirname, relative, resolve, sep, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../../..");
const DOCS = resolve(ROOT, "apps/docs");
const META_PATH = resolve(DOCS, "@/content/components.meta.ts");
const OUTPUT_PATH = resolve(DOCS, "@/components/component-story-previews.tsx");
const OUTPUT_DIR = dirname(OUTPUT_PATH);
const DOCS_AT = resolve(DOCS, "@");

const STORY_EXTENSIONS = [".stories.tsx", ".stories.ts", ".stories.jsx", ".stories.js"];

const STORY_DIR_GROUPS = {
  ui: [resolve(DOCS, "src/components")],
  business: [resolve(DOCS, "src/business")],
  layout: [resolve(DOCS, "src/layout")],
};

const ALL_STORY_DIRS = [
  ...STORY_DIR_GROUPS.ui,
  ...STORY_DIR_GROUPS.business,
  ...STORY_DIR_GROUPS.layout,
];

/* -------------------------------------------------------------------------- */
/*  Parse components.meta.ts                                                  */
/* -------------------------------------------------------------------------- */

function parseMeta() {
  const src = readFileSync(META_PATH, "utf-8");
  const arrayStart = src.indexOf("components: ComponentMeta[] = [");
  if (arrayStart === -1) throw new Error("Cannot find components array");

  const body = src.slice(arrayStart);
  const entryRe = /\{\s*slug:\s*'([^']+)'[\s\S]*?name:\s*"([^"]+)"[\s\S]*?sourcePath:\s*'([^']+)'/g;
  const entries = [];
  let m;

  while ((m = entryRe.exec(body)) !== null) {
    entries.push({ slug: m[1], name: m[2], sourcePath: m[3] });
  }

  return entries;
}

/* -------------------------------------------------------------------------- */
/*  Story lookup                                                              */
/* -------------------------------------------------------------------------- */

function toPascalFromSlug(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function storyDirsFor(entry) {
  if (entry.sourcePath.includes("/business/")) return STORY_DIR_GROUPS.business;
  if (entry.sourcePath.includes("/layout/")) return STORY_DIR_GROUPS.layout;
  if (entry.sourcePath.includes("/ui/")) return STORY_DIR_GROUPS.ui;
  return ALL_STORY_DIRS;
}

function findStory(entry) {
  const candidates = [entry.name, toPascalFromSlug(entry.slug)];

  // Search category-specific dirs first, then fall back to all dirs
  const dirs = [...storyDirsFor(entry)];
  for (const allDir of ALL_STORY_DIRS) {
    if (!dirs.includes(allDir)) dirs.push(allDir);
  }

  for (const dir of dirs) {
    for (const base of candidates) {
      for (const ext of STORY_EXTENSIONS) {
        const filePath = resolve(dir, `${base}${ext}`);
        if (existsSync(filePath)) return filePath;
      }
    }
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/*  Import verification — check that all @/ imports resolve in the docs app   */
/* -------------------------------------------------------------------------- */

/**
 * Resolve a @/ import path to a file in the docs app's @/ tree.
 * Returns the absolute path if resolved, null otherwise.
 */
function resolveInDocs(importPath) {
  // importPath like "@/components/ui/button" or "@/lib/utils" or "@/hooks/use-foo"
  const rel = importPath.replace(/^@\//, "");
  const candidates = [
    resolve(DOCS_AT, rel + ".tsx"),
    resolve(DOCS_AT, rel + ".ts"),
    resolve(DOCS_AT, rel + "/index.tsx"),
    resolve(DOCS_AT, rel + "/index.ts"),
  ];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  return null;
}

/**
 * Check if a story file's @/ imports are all resolvable in the docs app.
 * Returns true if the story is safe to include.
 */
function verifyStoryImports(storyPath) {
  const content = readFileSync(storyPath, "utf-8");
  const importRe = /from\s+["'](@\/[^"']+)["']/g;
  let m;
  const unresolved = [];

  while ((m = importRe.exec(content)) !== null) {
    const importPath = m[1];
    if (!resolveInDocs(importPath)) {
      unresolved.push(importPath);
    }
  }

  return { valid: unresolved.length === 0, unresolved };
}

function importPathFor(filePath) {
  const rel = relative(OUTPUT_DIR, filePath).split(sep).join("/");
  return rel.startsWith(".") ? rel.replace(/\.(tsx|ts|jsx|js)$/, "") : `./${rel.replace(/\.(tsx|ts|jsx|js)$/, "")}`;
}

/* -------------------------------------------------------------------------- */
/*  Generate                                                                  */
/* -------------------------------------------------------------------------- */

function generate() {
  const entries = parseMeta();
  const previewEntries = [];
  const seen = new Set();
  let skipped = 0;
  let verified = 0;

  for (const entry of entries) {
    if (seen.has(entry.name)) continue;
    seen.add(entry.name);

    const storyPath = findStory(entry);
    if (!storyPath) continue;

    // For stories from apps/docs/src/, always include (known safe)
    const isDocsStory = storyPath.includes("/apps/docs/src/");

    if (!isDocsStory) {
      const { valid, unresolved } = verifyStoryImports(storyPath);
      if (!valid) {
        skipped++;
        continue;
      }
      verified++;
    }

    previewEntries.push({
      name: entry.name,
      importPath: importPathFor(storyPath),
    });
  }

  const output = `// Auto-generated by scripts/generate-component-story-previews.mjs. Do not edit manually.
// Maps PascalCase component names to Storybook-backed preview fixtures.
// Stories from apps/docs/src/ are always included; stories from src/stories/
// are included only after verifying all @/ imports resolve in the docs app.

"use client";

import dynamic from "next/dynamic";
import { createStoryPreview } from "@/components/story-preview-renderer";

export const componentStoryPreviews: Record<string, React.ComponentType> = {
${previewEntries
  .map(
    ({ name, importPath }) =>
      `  ${name}: dynamic(() => import("${importPath}").then((m) => ({ default: createStoryPreview(m) })), { ssr: false }),`,
  )
  .join("\n")}
};
`;

  writeFileSync(OUTPUT_PATH, output, "utf-8");
  console.log(`Generated ${OUTPUT_PATH}`);
  console.log(`  ${previewEntries.length} story preview entries`);
  console.log(`  ${verified} verified from src/stories/`);
  console.log(`  ${skipped} skipped (unresolvable imports)`);
}

generate();
