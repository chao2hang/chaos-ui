/**
 * Migration script: Replace local @/components/*, @/hooks/*, @/lib/* imports
 * with @chaos_team/chaos-ui package barrel imports in the docs app.
 *
 * Mapping rules:
 *   @/components/ui/xxx     → @chaos_team/chaos-ui/ui      (if source file exists)
 *   @/components/business/xxx → @chaos_team/chaos-ui/business (if source file exists)
 *   @/components/layout/xxx  → @chaos_team/chaos-ui/layout   (if source file exists)
 *   @/components/mobile/xxx  → @chaos_team/chaos-ui/mobile   (if source file exists)
 *   @/hooks/xxx             → @chaos_team/chaos-ui/hooks    (if source file exists)
 *   @/lib/xxx               → @chaos_team/chaos-ui/lib      (if source file exists)
 *
 * Docs-specific components (site-header, component-explorer, etc.) are kept as-is.
 * Components that don't exist in the package source are kept as-is.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, extname, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");
const DOCS_DIR = join(ROOT, "apps", "docs");
const SRC_COMPONENTS = join(ROOT, "components");
const SRC_HOOKS = join(ROOT, "hooks");
const SRC_LIB = join(ROOT, "lib");

// Extensions to check when resolving a module path
const EXTS = [".tsx", ".ts", ".jsx", ".js"];

// Directories that contain package components
const PACKAGE_DIRS = {
  "components/ui": join(SRC_COMPONENTS, "ui"),
  "components/business": join(SRC_COMPONENTS, "business"),
  "components/layout": join(SRC_COMPONENTS, "layout"),
  "components/mobile": join(SRC_COMPONENTS, "mobile"),
};

// Map from package dir to barrel import path
const BARREL_MAP = {
  "components/ui": "@chaos_team/chaos-ui/ui",
  "components/business": "@chaos_team/chaos-ui/business",
  "components/layout": "@chaos_team/chaos-ui/layout",
  "components/mobile": "@chaos_team/chaos-ui/mobile",
  "hooks": "@chaos_team/chaos-ui/hooks",
  "lib": "@chaos_team/chaos-ui/lib",
};

// Docs-specific components that should NOT be migrated
const DOCS_SPECIFIC_COMPONENTS = new Set([
  "site-header",
  "component-explorer",
  "component-card",
  "component-preview",
  "component-preview-impl",
  "component-previews",
  "component-story-previews",
  "component-search",
  "component-sidebar",
  "component-loader",
  "component-map",
  "command-palette",
  "code-block",
  "copy-button",
  "hero-quick-stats",
  "install-tabs",
  "install-tabs-client",
  "locale-provider",
  "mdx-loaders",
  "story-preview-renderer",
  "use-component-search",
  "component-preview-impl.test",
]);

// Special icon import mapping
const ICONS_MAP = {
  "@/components/ui/icons": "@chaos_team/chaos-ui/ui-icons",
  "@/components/ui/icons.ts": "@chaos_team/chaos-ui/ui-icons",
};

/**
 * Check if a file exists in a directory with any of the supported extensions.
 */
function fileExists(dir, name) {
  // Check exact file
  for (const ext of EXTS) {
    if (existsSync(join(dir, name + ext))) return true;
  }
  // Check index file in subdirectory
  if (existsSync(join(dir, name)) && statSync(join(dir, name)).isDirectory()) {
    for (const ext of EXTS) {
      if (existsSync(join(dir, name, "index" + ext))) return true;
    }
  }
  return false;
}

/**
 * Find which source directory contains a given module name.
 * Returns the barrel import path, or null if not found.
 */
function findBarrelImport(category, moduleName) {
  // Check if it's a docs-specific component (only for @/components/xxx without subcategory)
  if (DOCS_SPECIFIC_COMPONENTS.has(moduleName)) {
    return null;
  }

  // Handle icons specially
  if (category === "components/ui" && moduleName === "icons") {
    return "@chaos_team/chaos-ui/ui-icons";
  }

  // Check the corresponding source directory first
  const primaryDir = PACKAGE_DIRS[category];
  if (primaryDir && fileExists(primaryDir, moduleName)) {
    return BARREL_MAP[category];
  }

  // If not found in primary dir, check other package dirs
  if (category.startsWith("components/")) {
    for (const [dirKey, dirPath] of Object.entries(PACKAGE_DIRS)) {
      if (dirKey === category) continue;
      if (fileExists(dirPath, moduleName)) {
        return BARREL_MAP[dirKey];
      }
    }
  }

  // Check hooks
  if (category === "hooks") {
    if (fileExists(SRC_HOOKS, moduleName)) {
      return BARREL_MAP["hooks"];
    }
  }

  // Check lib (including subdirectories)
  if (category === "lib") {
    if (fileExists(SRC_LIB, moduleName)) {
      return BARREL_MAP["lib"];
    }
    // Check subdirectories (e.g., lib/i18n/xxx)
    const libSubdir = moduleName.split("/")[0];
    const libSubdirPath = join(SRC_LIB, libSubdir);
    if (existsSync(libSubdirPath) && statSync(libSubdirPath).isDirectory()) {
      const subModule = moduleName.slice(libSubdir.length + 1);
      if (fileExists(libSubdirPath, subModule)) {
        return BARREL_MAP["lib"];
      }
      // If the entire subdirectory is exported from lib barrel
      return BARREL_MAP["lib"];
    }
  }

  return null;
}

/**
 * Process a single import statement and return the replacement.
 */
function processImportStatement(importPath, category, moduleName) {
  // Handle barrel imports (e.g., @/components/ui or @/components/ui/index)
  if (!moduleName || moduleName === "index" || moduleName === "") {
    return BARREL_MAP[category] || null;
  }

  return findBarrelImport(category, moduleName);
}

/**
 * Migrate a single file's content.
 */
function migrateContent(content, filePath) {
  let changed = false;
  const stats = { replaced: 0, skipped: 0, total: 0 };

  // Regex to match import/export from statements with @/ paths
  // Captures: prefix (import/export...from), quote, path, quote
  const importRegex =
    /((?:import|export)[\s\S]*?from\s+|import\s*\(\s*|require\s*\(\s*)(["'`])(@\/[^"'`]+)\2/g;

  const dynamicImportRegex = /(import\s*\(\s*)(["'`])(@\/[^"'`]+)\2/g;

  function replacePath(match, prefix, quote, fullPath) {
    stats.total++;

    // Parse the path: @/components/ui/button → category="components/ui", module="button"
    // Parse the path: @/hooks/use-debounce → category="hooks", module="use-debounce"
    // Parse the path: @/lib/utils → category="lib", module="utils"
    // Parse the path: @/components/site-header → category="components", module="site-header"

    // Check for icons special case
    if (ICONS_MAP[fullPath]) {
      stats.replaced++;
      changed = true;
      return `${prefix}${quote}${ICONS_MAP[fullPath]}${quote}`;
    }

    // Determine category and module
    let category = null;
    let moduleName = null;

    if (fullPath.startsWith("@/components/ui/")) {
      category = "components/ui";
      moduleName = fullPath.slice("@/components/ui/".length);
    } else if (fullPath === "@/components/ui") {
      category = "components/ui";
      moduleName = "";
    } else if (fullPath.startsWith("@/components/business/")) {
      category = "components/business";
      moduleName = fullPath.slice("@/components/business/".length);
    } else if (fullPath === "@/components/business") {
      category = "components/business";
      moduleName = "";
    } else if (fullPath.startsWith("@/components/layout/")) {
      category = "components/layout";
      moduleName = fullPath.slice("@/components/layout/".length);
    } else if (fullPath === "@/components/layout") {
      category = "components/layout";
      moduleName = "";
    } else if (fullPath.startsWith("@/components/mobile/")) {
      category = "components/mobile";
      moduleName = fullPath.slice("@/components/mobile/".length);
    } else if (fullPath === "@/components/mobile") {
      category = "components/mobile";
      moduleName = "";
    } else if (fullPath.startsWith("@/hooks/")) {
      category = "hooks";
      moduleName = fullPath.slice("@/hooks/".length);
    } else if (fullPath === "@/hooks") {
      category = "hooks";
      moduleName = "";
    } else if (fullPath.startsWith("@/lib/")) {
      category = "lib";
      moduleName = fullPath.slice("@/lib/".length);
    } else if (fullPath === "@/lib") {
      category = "lib";
      moduleName = "";
    } else {
      // Not a package path (e.g., @/components/site-header)
      stats.skipped++;
      return match;
    }

    // Strip file extension from module name if present
    if (moduleName) {
      const ext = extname(moduleName);
      if (ext) {
        moduleName = moduleName.slice(0, -ext.length);
      }
    }

    const replacement = processImportStatement(fullPath, category, moduleName);

    if (replacement) {
      stats.replaced++;
      changed = true;
      return `${prefix}${quote}${replacement}${quote}`;
    } else {
      stats.skipped++;
      return match;
    }
  }

  // Process static imports/exports
  let newContent = content.replace(importRegex, replacePath);

  // Process dynamic imports (already covered by importRegex, but just in case)
  newContent = newContent.replace(dynamicImportRegex, replacePath);

  return { content: newContent, changed, stats };
}

/**
 * Recursively find all files to process.
 */
function findFiles(dir, extensions, excludeDirs = []) {
  const results = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (excludeDirs.includes(entry)) continue;
      results.push(...findFiles(fullPath, extensions, excludeDirs));
    } else if (extensions.includes(extname(entry))) {
      results.push(fullPath);
    }
  }

  return results;
}

// Main execution
const EXTENSIONS = [".ts", ".tsx", ".mdx"];
const EXCLUDE_DIRS = ["node_modules", ".next", ".storybook", "storybook-static", "dist"];

console.log("🔍 Scanning for files in apps/docs/...");
const files = findFiles(DOCS_DIR, EXTENSIONS, EXCLUDE_DIRS);
console.log(`Found ${files.length} files to process`);

let totalReplaced = 0;
let totalSkipped = 0;
let totalFiles = 0;
const changedFiles = [];
const skippedPaths = new Map(); // path → count

for (const file of files) {
  const content = readFileSync(file, "utf-8");
  const { content: newContent, changed, stats } = migrateContent(content, file);

  if (changed) {
    writeFileSync(file, newContent, "utf-8");
    changedFiles.push(file);
    totalReplaced += stats.replaced;
    totalFiles++;
  }
  totalSkipped += stats.skipped;
}

console.log(`\n✅ Migration complete!`);
console.log(`   Files modified: ${totalFiles}`);
console.log(`   Imports replaced: ${totalReplaced}`);
console.log(`   Imports skipped (docs-specific or not in package): ${totalSkipped}`);

if (changedFiles.length > 0) {
  console.log(`\nModified files:`);
  for (const f of changedFiles.slice(0, 50)) {
    console.log(`  ${f.replace(ROOT + "\\", "")}`);
  }
  if (changedFiles.length > 50) {
    console.log(`  ... and ${changedFiles.length - 50} more`);
  }
}
