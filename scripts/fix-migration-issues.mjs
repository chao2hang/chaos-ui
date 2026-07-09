/**
 * Fix script: Handle migration issues that couldn't be auto-resolved.
 *
 * 1. Revert i18n-specific imports from @chaos_team/chaos-ui/lib back to @/lib/i18n/xxx
 * 2. Revert docs-specific form component imports back to local
 * 3. Fix stories file import paths (wrong barrel or casing)
 * 4. Revert Grid import (not in package)
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");
const DOCS_DIR = join(ROOT, "apps", "docs");

// i18n symbols that come from docs-specific @/lib/i18n/ files
const I18N_LOCALE_SYMBOLS = new Set([
  "DEFAULT_LOCALE",
  "isLocale",
  "LOCALE_COOKIE",
  "normalizeLocale",
]);
const I18N_LOCALE_TYPES = new Set(["Locale"]);
const I18N_SERVER_SYMBOLS = new Set(["getServerLocale"]);
const I18N_DICT_SYMBOLS = new Set(["dict", "t", "categoryLabel"]);
const I18N_DICT_TYPES = new Set(["DictShape"]);

// Docs-specific form components not in package
const DOCS_FORM_SYMBOLS = new Set([
  "FormAutosaveIndicator",
  "FormDirtyWarning",
  "FormErrorSummary",
  "FormStepSummary",
  "FormRepeater",
  "FormFieldGroup",
  "FormProgress",
]);

/**
 * Fix i18n imports in a file.
 * Splits @chaos_team/chaos-ui/lib imports that contain i18n symbols
 * into package imports + local i18n imports.
 */
function fixI18nImports(content) {
  let changed = false;

  // Match import statements from @chaos_team/chaos-ui/lib
  // Handle both single-line and multi-line imports
  const importRegex =
    /import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+["']@chaos_team\/chaos-ui\/lib["'];?/g;

  content = content.replace(importRegex, (match, symbols, offset, fullContent) => {
    const isTypeImport = match.includes("import type ");
    const symbolList = symbols
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    // Parse "type X" entries
    const parsedSymbols = [];
    for (const s of symbolList) {
      if (s.startsWith("type ")) {
        parsedSymbols.push({ name: s.slice(5).trim(), isType: true });
      } else {
        parsedSymbols.push({ name: s, isType: false });
      }
    }

    const localeSymbols = [];
    const localeTypes = [];
    const serverSymbols = [];
    const dictSymbols = [];
    const dictTypes = [];
    const remainingSymbols = [];

    for (const sym of parsedSymbols) {
      if (I18N_LOCALE_SYMBOLS.has(sym.name)) {
        localeSymbols.push(sym);
      } else if (I18N_LOCALE_TYPES.has(sym.name)) {
        localeTypes.push(sym);
      } else if (I18N_SERVER_SYMBOLS.has(sym.name)) {
        serverSymbols.push(sym);
      } else if (I18N_DICT_SYMBOLS.has(sym.name)) {
        dictSymbols.push(sym);
      } else if (I18N_DICT_TYPES.has(sym.name)) {
        dictTypes.push(sym);
      } else {
        remainingSymbols.push(sym);
      }
    }

    if (
      localeSymbols.length === 0 &&
      localeTypes.length === 0 &&
      serverSymbols.length === 0 &&
      dictSymbols.length === 0 &&
      dictTypes.length === 0
    ) {
      return match; // No i18n symbols, keep as-is
    }

    changed = true;
    const imports = [];

    // Remaining package imports
    if (remainingSymbols.length > 0) {
      const symStr = remainingSymbols
        .map((s) => (s.isType ? `type ${s.name}` : s.name))
        .join(", ");
      imports.push(
        `import ${isTypeImport ? "type " : ""}{ ${symStr} } from "@chaos_team/chaos-ui/lib";`,
      );
    }

    // Locale imports
    const localeAll = [...localeSymbols, ...localeTypes];
    if (localeAll.length > 0) {
      const symStr = localeAll
        .map((s) => (s.isType || localeTypes.includes(s) ? `type ${s.name}` : s.name))
        .join(", ");
      imports.push(`import { ${symStr} } from "@/lib/i18n/locale";`);
    }

    // Server locale imports
    if (serverSymbols.length > 0) {
      const symStr = serverSymbols.map((s) => s.name).join(", ");
      imports.push(`import { ${symStr} } from "@/lib/i18n/get-server-locale";`);
    }

    // Dict imports
    const dictAll = [...dictSymbols, ...dictTypes];
    if (dictAll.length > 0) {
      const symStr = dictAll
        .map((s) => (s.isType || dictTypes.includes(s) ? `type ${s.name}` : s.name))
        .join(", ");
      imports.push(`import { ${symStr} } from "@/lib/i18n/dict";`);
    }

    return imports.join("\n");
  });

  return { content, changed };
}

/**
 * Fix docs-specific form component imports.
 * These components don't exist in the package, so revert to local imports.
 */
function fixFormComponentImports(content) {
  let changed = false;

  const importRegex =
    /import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+["']@chaos_team\/chaos-ui\/ui["'];?/g;

  content = content.replace(importRegex, (match, symbols) => {
    const symbolList = symbols
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const docsFormSymbols = [];
    const remainingSymbols = [];

    for (const s of symbolList) {
      const name = s.replace(/^type\s+/, "").trim();
      if (DOCS_FORM_SYMBOLS.has(name)) {
        docsFormSymbols.push(s.trim());
      } else {
        remainingSymbols.push(s.trim());
      }
    }

    if (docsFormSymbols.length === 0) {
      return match; // No docs-specific form symbols
    }

    changed = true;
    const imports = [];

    if (remainingSymbols.length > 0) {
      imports.push(
        `import { ${remainingSymbols.join(", ")} } from "@chaos_team/chaos-ui/ui";`,
      );
    }

    // Group docs form symbols by their source file
    // Most are in @/components/ui/ with the same kebab-case name
    for (const sym of docsFormSymbols) {
      const name = sym.replace(/^type\s+/, "").trim();
      const kebab = name
        .replace(/([A-Z])/g, "-$1")
        .toLowerCase()
        .replace(/^-/, "");
      imports.push(`import { ${sym} } from "@/components/ui/${kebab}";`);
    }

    return imports.join("\n");
  });

  return { content, changed };
}

/**
 * Fix specific stories file issues.
 */
function fixStoriesIssues(content, filePath) {
  let changed = false;

  // Fix FormField.stories.tsx - FormField is in UI barrel, not business
  if (content.includes('from "@chaos_team/chaos-ui/business"') && content.includes("FormField")) {
    content = content.replace(
      /import\s+\{\s*FormField\s*\}\s+from\s+["']@chaos_team\/chaos-ui\/business["'];?/,
      'import { FormField } from "@chaos_team/chaos-ui/ui";',
    );
    changed = true;
  }

  // Fix GlobalLoading.stories.tsx - GlobalLoading is in UI barrel, not business
  if (content.includes('from "@chaos_team/chaos-ui/business"') && content.includes("GlobalLoading")) {
    content = content.replace(
      /import\s+\{\s*GlobalLoading\s*\}\s+from\s+["']@chaos_team\/chaos-ui\/business["'];?/,
      'import { GlobalLoading } from "@chaos_team/chaos-ui/ui";',
    );
    changed = true;
  }

  // Fix MobileQrcodeScanner.stories.tsx - casing: MobileQrcodeScanner → MobileQrCodeScanner
  if (content.includes("MobileQrcodeScanner")) {
    content = content.replaceAll("MobileQrcodeScanner", "MobileQrCodeScanner");
    changed = true;
  }

  // Fix Grid.stories.tsx - Grid is not exported, revert to local import
  if (content.includes('import { Grid } from "@chaos_team/chaos-ui/ui"')) {
    content = content.replace(
      'import { Grid } from "@chaos_team/chaos-ui/ui";',
      'import { Grid } from "@/components/ui/grid";',
    );
    changed = true;
  }

  return { content, changed };
}

// Process all files
import { readdirSync, statSync } from "fs";

function findFiles(dir, extensions, excludeDirs = []) {
  const results = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (excludeDirs.includes(entry)) continue;
      results.push(...findFiles(fullPath, extensions, excludeDirs));
    } else if (extensions.includes(entry.split(".").pop())) {
      results.push(fullPath);
    }
  }

  return results;
}

const EXTENSIONS = ["ts", "tsx", "mdx"];
const EXCLUDE_DIRS = ["node_modules", ".next", ".storybook", "storybook-static", "dist"];

console.log("🔧 Fixing migration issues...");
const files = findFiles(DOCS_DIR, EXTENSIONS, EXCLUDE_DIRS);
console.log(`Scanning ${files.length} files...`);

let totalFixed = 0;
const fixedFiles = [];

for (const file of files) {
  let content = readFileSync(file, "utf-8");
  let fileChanged = false;

  // Fix i18n imports
  const i18nResult = fixI18nImports(content);
  if (i18nResult.changed) {
    content = i18nResult.content;
    fileChanged = true;
  }

  // Fix form component imports
  const formResult = fixFormComponentImports(content);
  if (formResult.changed) {
    content = formResult.content;
    fileChanged = true;
  }

  // Fix stories issues
  const storiesResult = fixStoriesIssues(content, file);
  if (storiesResult.changed) {
    content = storiesResult.content;
    fileChanged = true;
  }

  if (fileChanged) {
    writeFileSync(file, content, "utf-8");
    totalFixed++;
    fixedFiles.push(file);
  }
}

console.log(`\n✅ Fixed ${totalFixed} files`);
if (fixedFiles.length > 0) {
  console.log("Fixed files:");
  for (const f of fixedFiles) {
    console.log(`  ${f.replace(ROOT + "\\", "")}`);
  }
}
