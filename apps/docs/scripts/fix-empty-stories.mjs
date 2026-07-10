#!/usr/bin/env node
/**
 * fix-empty-stories.mjs
 *
 * Scans story files with empty `export const Default: Story = {};` and
 * generates meaningful `render` functions by reading the component source,
 * extracting the props interface, and producing sensible mock data.
 *
 * Usage: node scripts/fix-empty-stories.mjs
 */

import { existsSync, readFileSync, writeFileSync, readdirSync } from "fs";
import { dirname, resolve, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS = resolve(__dirname, "..");
const COMP_ROOT = resolve(DOCS, "../../components");

/* -------------------------------------------------------------------------- */
/*  Find all story files with empty Default                                   */
/* -------------------------------------------------------------------------- */

function findEmptyStories() {
  const dirs = [
    resolve(DOCS, "src/business"),
    resolve(DOCS, "src/components"),
    resolve(DOCS, "src/layout"),
  ];
  const results = [];
  for (const dir of dirs) {
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir)) {
      if (!file.endsWith(".stories.tsx")) continue;
      const filePath = resolve(dir, file);
      const content = readFileSync(filePath, "utf-8");
      // Match empty story: export const Default: Story = {};
      if (/export\s+const\s+\w+:\s*Story\s*=\s*\{\s*\}/.test(content)) {
        results.push({ filePath, content, file });
      }
    }
  }
  return results;
}

/* -------------------------------------------------------------------------- */
/*  Extract component name and import from story file                         */
/* -------------------------------------------------------------------------- */

function parseStoryFile(content) {
  // Match: import { ComponentName } from "@chaos_team/chaos-ui/business"
  //    or: import { ComponentName } from "@chaos_team/chaos-ui/ui"
  //    or: import { ComponentName } from "@chaos_team/chaos-ui/layout"
  //    or: import { ComponentName } from "@chaos_team/chaos-ui/mobile"
  const importMatch = content.match(
    /import\s+\{([^}]+)\}\s+from\s+["']@chaos_team\/chaos-ui\/(business|ui|layout|mobile)["']/,
  );
  if (importMatch) {
    const importNames = importMatch[1]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const subpkg = importMatch[2];
    const componentName = importNames[0].split(/\s+as\s+/)[0];
    return { componentName, subpkg, allImports: importNames, importPath: null };
  }

  // Match: import { ComponentName } from "@/components/business/xxx"
  //    or: import { ComponentName } from "@/components/ui/xxx"
  //    or: import { ComponentName } from "@/components/layout/xxx"
  const localImportMatch = content.match(
    /import\s+\{([^}]+)\}\s+from\s+["']@\/components\/(business|ui|layout|mobile)\/([^"']+)["']/,
  );
  if (localImportMatch) {
    const importNames = localImportMatch[1]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const subpkg = localImportMatch[2];
    const componentName = importNames[0].split(/\s+as\s+/)[0];
    const importPath = `@/components/${subpkg}/${localImportMatch[3]}`;
    return { componentName, subpkg, allImports: importNames, importPath };
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/*  Find component source file                                                */
/* -------------------------------------------------------------------------- */

function findComponentSource(componentName, subpkg, importPath) {
  const kebab = componentName
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");

  // If importPath is from @/components, resolve in the docs @ tree
  if (importPath) {
    const rel = importPath.replace(/^@\//, "");
    const docsRoot = resolve(DOCS, "@");
    const candidates = [
      resolve(docsRoot, rel + ".tsx"),
      resolve(docsRoot, rel + ".ts"),
      resolve(docsRoot, rel, "index.tsx"),
      resolve(docsRoot, rel, "index.ts"),
    ];
    for (const c of candidates) {
      if (existsSync(c)) return c;
    }
  }

  // Search in component source directories
  const dirs = [
    resolve(COMP_ROOT, subpkg),
    resolve(COMP_ROOT, "business"),
    resolve(COMP_ROOT, "ui"),
    resolve(COMP_ROOT, "layout"),
    resolve(COMP_ROOT, "mobile"),
  ];
  for (const dir of dirs) {
    if (!existsSync(dir)) continue;
    const candidates = [
      resolve(dir, `${kebab}.tsx`),
      resolve(dir, `${componentName}.tsx`),
    ];
    for (const c of candidates) {
      if (existsSync(c)) return c;
    }
    // Try to find by reading directory
    for (const f of readdirSync(dir)) {
      if (!f.endsWith(".tsx") || f.endsWith(".test.tsx")) continue;
      const src = readFileSync(resolve(dir, f), "utf-8");
      if (
        new RegExp(`\\b(?:function|const)\\s+${componentName}\\b`).test(src) ||
        new RegExp(`export\\s+function\\s+${componentName}\\b`).test(src)
      ) {
        return resolve(dir, f);
      }
    }
  }
  return null;
}

/* -------------------------------------------------------------------------- */
/*  Parse component props interface and destructuring                         */
/* -------------------------------------------------------------------------- */

function parseProps(source, componentName) {
  // Find the destructuring pattern: function Component({ prop1, prop2 = default, ...rest }: Props)
  // or: function Component({ prop1, prop2 = default }: Props)
  const destructureRe = new RegExp(
    `(?:function\\s+${componentName}|const\\s+${componentName}\\s*=)[\\s\\S]*?\\{\\s*([\\s\\S]*?)\\s*\\}\\s*:\\s*(\\w+)`,
  );
  const destructureMatch = source.match(destructureRe);

  let destructuredProps = [];
  let propsWithoutDefaults = [];

  if (destructureMatch) {
    const destructureBody = destructureMatch[1];
    // Parse each prop: propName, propName = defaultValue, propName?: type
    const propEntries = destructureBody
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s && !s.startsWith("..."));

    for (const entry of propEntries) {
      const propMatch = entry.match(/^(\w+)\s*(?:=\s*(.+))?$/);
      if (propMatch) {
        const name = propMatch[1];
        const hasDefault = !!propMatch[2];
        destructuredProps.push({ name, hasDefault, default: propMatch[2] });
        if (!hasDefault) {
          propsWithoutDefaults.push(name);
        }
      }
    }
  }

  // Also try to parse the Props interface for type info
  const propsInterfaceRe =
    /interface\s+(\w+Props)\s*(?:extends\s+[\s\S]*?)?\s*\{([\s\S]*?)\}/g;
  let interfaceMatch;
  let propsTypeInfo = {};
  while ((interfaceMatch = propsInterfaceRe.exec(source)) !== null) {
    const body = interfaceMatch[2];
    // Parse each prop: name: type; or name?: type;
    const propRe = /(\w+)\??\s*:\s*([^;\n]+)/g;
    let pm;
    while ((pm = propRe.exec(body)) !== null) {
      const name = pm[1].trim();
      const type = pm[2].trim();
      propsTypeInfo[name] = type;
    }
  }

  return { destructuredProps, propsWithoutDefaults, propsTypeInfo };
}

/* -------------------------------------------------------------------------- */
/*  Generate mock value for a prop based on name and type                     */
/* -------------------------------------------------------------------------- */

function generateMockValue(propName, propType) {
  const name = propName.toLowerCase();
  const type = propType || "";

  // Callbacks
  if (/^on[A-Z]/.test(propName) || type.includes("=>")) {
    return "() => {}";
  }

  // Boolean props
  if (type.includes("boolean") || name === "loading" || name === "disabled" || name === "readonly" || name === "spinning") {
    return "false";
  }
  if (name === "visible" || name === "open" || name === "show" || name === "defaultopen" || name === "defaultchecked" || name === "checked" || name === "expanded" || name === "collapsible") {
    return "true";
  }

  // String props
  if (type.includes("string") && !type.includes("[]")) {
    if (name.includes("placeholder")) return '"请输入"';
    if (name.includes("label") || name.includes("title")) return '"示例"';
    if (name.includes("description") || name.includes("desc")) return '"这是一个示例描述"';
    if (name.includes("name")) return '"示例名称"';
    if (name === "value" || name === "text" || name === "content") return '"示例内容"';
    if (name.includes("tip") || name.includes("hint")) return '"提示信息"';
    if (name.includes("src") || name.includes("url")) return '"https://placehold.co/400x300/e2e8f0/64748b?text=Image"';
    if (name.includes("color")) return '"#3b82f6"';
    if (name.includes("icon")) return "null";
    if (name.includes("avatar")) return '"https://github.com/shadcn.png"';
    if (name.includes("author")) return '"张三"';
    if (name.includes("version")) return '"v1.0.0"';
    if (name.includes("date") || name.includes("time")) return '"2026-07-10"';
    if (name.includes("status")) return '"active"';
    return '"示例"';
  }

  // Number props
  if (type.includes("number") && !type.includes("[]")) {
    if (name.includes("total")) return "10";
    if (name.includes("count") || name.includes("size") || name.includes("height") || name.includes("width")) return "200";
    if (name.includes("index")) return "0";
    if (name.includes("step")) return "1";
    if (name.includes("max")) return "100";
    if (name.includes("min")) return "0";
    if (name.includes("value")) return "42";
    if (name.includes("budget") || name.includes("amount") || name.includes("price")) return "10000";
    if (name.includes("duration")) return "2000";
    return "42";
  }

  // Array props
  if (type.includes("[]") || type.includes("Array<")) {
    if (name === "data") {
      // Check if it's chart data (has label/value) or table data
      if (type.includes("label") && type.includes("value")) {
        return '[{ label: "一月", value: 38 }, { label: "二月", value: 52 }, { label: "三月", value: 41 }]';
      }
      if (type.includes("string")) {
        return '["选项A", "选项B", "选项C"]';
      }
      return '[{ id: "1", name: "示例1" }, { id: "2", name: "示例2" }, { id: "3", name: "示例3" }]';
    }
    if (name === "columns") {
      return '[{ key: "name", header: "名称" }, { key: "value", header: "值" }]';
    }
    if (name === "series") {
      return '[{ name: "营收", values: [20, 35, 28, 50, 44] }]';
    }
    if (name === "labels") {
      return '["Q1", "Q2", "Q3", "Q4"]';
    }
    if (name === "selectedids" || name === "ids") {
      return '["1", "2", "3"]';
    }
    if (name === "items" || name === "entries" || name === "versions" || name === "steps" || name === "roles" || name === "resources" || name === "actions" || name === "options") {
      return "[]";
    }
    if (name === "children" && type.includes("TreeNode")) {
      return "undefined";
    }
    return "[]";
  }

  // ReactNode / ReactElement
  if (type.includes("ReactNode") || type.includes("React.ReactElement") || type.includes("JSX.Element")) {
    return "null";
  }

  // Children
  if (name === "children") {
    return '"内容"';
  }

  // Object types
  if (type.includes("{")) {
    return "{}";
  }

  // Enum/union
  if (type.includes("|")) {
    // Pick the first non-undefined option
    const options = type
      .split("|")
      .map((s) => s.trim().replace(/["']/g, ""))
      .filter((s) => s && s !== "undefined" && s !== "null");
    if (options.length > 0) {
      if (options[0] === "string" || options[0] === "number") return '"示例"';
      return `"${options[0]}"`;
    }
  }

  // Record types
  if (type.includes("Record<")) {
    return "{}";
  }

  // className
  if (name === "classname") {
    return '""';
  }

  // Default fallback
  return "undefined";
}

/* -------------------------------------------------------------------------- */
/*  Generate render function for story                                        */
/* -------------------------------------------------------------------------- */

function generateRenderFunction(componentName, allImports, propsWithoutDefaults, propsTypeInfo) {
  // If no props without defaults, the component should render fine as-is
  if (propsWithoutDefaults.length === 0) {
    return null; // No render function needed
  }

  // Generate mock props
  const mockProps = [];
  for (const prop of propsWithoutDefaults) {
    if (prop === "className") continue;
    const type = propsTypeInfo[prop] || "";
    const mockValue = generateMockValue(prop, type);
    if (mockValue === "undefined") continue;
    mockProps.push(`    ${prop}={${mockValue}}`);
  }

  if (mockProps.length === 0) {
    return null;
  }

  // Generate the render function - always use self-closing tags
  // to avoid "children specified twice" errors
  const propsStr = mockProps.join("\n");

  return `  render: () => (
    <${componentName}${propsStr ? "\n" + propsStr + "\n  " : " "}/>
  ),`;
}

/* -------------------------------------------------------------------------- */
/*  Update story file                                                         */
/* -------------------------------------------------------------------------- */

function updateStoryFile(filePath, content, componentName, renderFunction) {
  // If no render function needed, skip
  if (!renderFunction) return false;

  // Replace: export const Default: Story = {};
  // With: export const Default: Story = { render: () => (...) };
  const emptyStoryRe = /export\s+const\s+(Default|Preview|Basic|Primary|Demo)\s*:\s*Story\s*=\s*\{\s*\}\s*;?/;
  const match = content.match(emptyStoryRe);
  if (!match) return false;

  const storyName = match[1];
  const replacement = `export const ${storyName}: Story = {\n${renderFunction}\n};`;

  const newContent = content.replace(emptyStoryRe, replacement);
  writeFileSync(filePath, newContent, "utf-8");
  return true;
}

/* -------------------------------------------------------------------------- */
/*  Main                                                                      */
/* -------------------------------------------------------------------------- */

function main() {
  const emptyStories = findEmptyStories();
  console.log(`Found ${emptyStories.length} story files with empty args\n`);

  let updated = 0;
  let skipped = 0;
  let noSource = 0;
  let noRenderNeeded = 0;

  for (const { filePath, content, file } of emptyStories) {
    const parsed = parseStoryFile(content);
    if (!parsed) {
      console.log(`  SKIP (no import): ${file}`);
      skipped++;
      continue;
    }

    const { componentName, subpkg, allImports } = parsed;
    const sourcePath = findComponentSource(componentName, parsed.subpkg, parsed.importPath);

    if (!sourcePath) {
      console.log(`  NO SOURCE: ${componentName} (${file})`);
      noSource++;
      continue;
    }

    const source = readFileSync(sourcePath, "utf-8");
    const { destructuredProps, propsWithoutDefaults, propsTypeInfo } = parseProps(
      source,
      componentName,
    );

    const renderFunction = generateRenderFunction(
      componentName,
      allImports,
      propsWithoutDefaults,
      propsTypeInfo,
    );

    if (!renderFunction) {
      console.log(`  OK (has defaults): ${componentName}`);
      noRenderNeeded++;
      continue;
    }

    const wasUpdated = updateStoryFile(
      filePath,
      content,
      componentName,
      renderFunction,
    );
    if (wasUpdated) {
      console.log(`  UPDATED: ${componentName} (${propsWithoutDefaults.length} props)`);
      updated++;
    } else {
      console.log(`  SKIP (no match): ${componentName}`);
      skipped++;
    }
  }

  console.log(`\n--- Summary ---`);
  console.log(`  Updated: ${updated}`);
  console.log(`  No render needed (has defaults): ${noRenderNeeded}`);
  console.log(`  No source found: ${noSource}`);
  console.log(`  Skipped: ${skipped}`);
}

main();
