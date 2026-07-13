#!/usr/bin/env node
/**
 * generate-component-story-previews.mjs
 *
 * Generates `@/components/component-story-previews.tsx` — a lazy-loading map of
 * component name → Storybook story preview. Story fixtures sit between curated
 * hand-authored previews and bare component instantiation on docs detail pages.
 *
 * Storybook SoT is monorepo `src/stories/{ui,business,layout,mobile}`.
 * Dual inventory under apps/docs/src (stories) was removed; this generator
 * must only emit import() paths for story files that actually exist.
 *
 * Stories import package source via `@/components/*` etc.; apps/docs/next.config.ts
 * maps those aliases to the monorepo root so previews load without docs shims.
 */

import { existsSync, readFileSync, writeFileSync } from "fs";
import { dirname, relative, resolve, sep } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../../..");
const DOCS = resolve(ROOT, "apps/docs");
const META_PATH = resolve(DOCS, "@/content/components.meta.ts");
const OUTPUT_PATH = resolve(DOCS, "@/components/component-story-previews.tsx");
const OUTPUT_DIR = dirname(OUTPUT_PATH);

const STORY_EXTENSIONS = [".stories.tsx", ".stories.ts", ".stories.jsx", ".stories.js"];

/** Storybook source-of-truth directories (repo root). */
const STORY_DIR_GROUPS = {
  ui: [resolve(ROOT, "src/stories/ui")],
  business: [resolve(ROOT, "src/stories/business")],
  layout: [resolve(ROOT, "src/stories/layout")],
  mobile: [resolve(ROOT, "src/stories/mobile")],
};

const ALL_STORY_DIRS = [
  ...STORY_DIR_GROUPS.ui,
  ...STORY_DIR_GROUPS.business,
  ...STORY_DIR_GROUPS.layout,
  ...STORY_DIR_GROUPS.mobile,
];

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
  if (entry.sourcePath.includes("/mobile/")) return STORY_DIR_GROUPS.mobile;
  if (entry.sourcePath.includes("/ui/")) return STORY_DIR_GROUPS.ui;
  return ALL_STORY_DIRS;
}

function findStory(entry) {
  const candidates = [entry.name, toPascalFromSlug(entry.slug)];

  // Category dirs first, then all SoT dirs (handles misplaced stories).
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

/**
 * Resolve package-source imports used by SoT stories (next.config aliases).
 * Returns absolute path if resolved, null otherwise.
 */
function resolvePackageImport(importPath) {
  const rel = importPath.replace(/^@\//, "");
  const candidates = [
    resolve(ROOT, rel + ".tsx"),
    resolve(ROOT, rel + ".ts"),
    resolve(ROOT, rel + "/index.tsx"),
    resolve(ROOT, rel + "/index.ts"),
  ];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  return null;
}

/**
 * Soft check: story @/ imports that next.config aliases to package source.
 * Unknown prefixes (e.g. story-only helpers) are allowed; missing package
 * modules are skipped so we never emit a broken import().
 */
function verifyStoryImports(storyPath) {
  const content = readFileSync(storyPath, "utf-8");
  const importRe = /from\s+["'](@\/[^"']+)["']/g;
  let m;
  const unresolved = [];

  while ((m = importRe.exec(content)) !== null) {
    const importPath = m[1];
    // Only enforce package paths next.config maps for stories.
    if (
      importPath.startsWith("@/components/") ||
      importPath.startsWith("@/hooks/") ||
      importPath.startsWith("@/lib/")
    ) {
      if (!resolvePackageImport(importPath)) {
        unresolved.push(importPath);
      }
    }
  }

  return { valid: unresolved.length === 0, unresolved };
}

function importPathFor(filePath) {
  const rel = relative(OUTPUT_DIR, filePath).split(sep).join("/");
  return rel.startsWith(".")
    ? rel.replace(/\.(tsx|ts|jsx|js)$/, "")
    : `./${rel.replace(/\.(tsx|ts|jsx|js)$/, "")}`;
}

/* -------------------------------------------------------------------------- */
/*  Generate                                                                  */
/* -------------------------------------------------------------------------- */

function generate() {
  const entries = parseMeta();
  const previewEntries = [];
  const seen = new Set();
  let skippedMissing = 0;
  let skippedImports = 0;
  let verified = 0;

  for (const entry of entries) {
    if (seen.has(entry.name)) continue;
    seen.add(entry.name);

    const storyPath = findStory(entry);
    if (!storyPath) {
      skippedMissing++;
      continue;
    }

    const { valid, unresolved } = verifyStoryImports(storyPath);
    if (!valid) {
      skippedImports++;
      console.warn(
        `skip ${entry.name}: unresolved imports: ${unresolved.join(", ")}`,
      );
      continue;
    }
    verified++;

    previewEntries.push({
      name: entry.name,
      importPath: importPathFor(storyPath),
    });
  }

  // Multi-line dynamic() so Turbopack traces each literal path clearly.
  const body = previewEntries
    .map(
      ({ name, importPath }) =>
        `  ${name}: dynamic(
    () =>
      import("${importPath}").then((m) => ({
        default: createStoryPreview(m),
      })),
    { ssr: false },
  ),`,
    )
    .join("\n");

  const output = `// @ts-nocheck
// Auto-generated by scripts/generate-component-story-previews.mjs. Do not edit manually.
// Maps PascalCase names → Storybook story modules (src/stories/** SoT).
// Only emits import() for files that exist; missing stories fall through to component-loader.
// Literal import() required by bundler; isolate from typecheck via tsconfig exclude + // @ts-nocheck.

"use client";

import dynamic from "next/dynamic";
import { createStoryPreview } from "@/components/story-preview-renderer";

// Literal import() paths are required for Next/Turbopack static analysis.
// Docs typecheck isolates this file via tsconfig exclude + // @ts-nocheck.
export const componentStoryPreviews: Record<string, React.ComponentType> = {
${body}
};
`;

  writeFileSync(OUTPUT_PATH, output, "utf-8");
  console.log(`Generated ${OUTPUT_PATH}`);
  console.log(`  ${previewEntries.length} story preview entries`);
  console.log(`  ${verified} verified from src/stories/`);
  console.log(`  ${skippedMissing} skipped (no story file)`);
  console.log(`  ${skippedImports} skipped (unresolvable package imports)`);
}

generate();
