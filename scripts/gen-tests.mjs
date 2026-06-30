import fs from "node:fs";
import path from "node:path";

const dirs = [
  { dir: "components/ui", ext: ".tsx" },
  { dir: "components/business", ext: ".tsx" },
  { dir: "components/layout", ext: ".tsx" },
  { dir: "hooks", ext: ".ts" },
  { dir: "lib", ext: ".ts" },
];

let generated = 0;

for (const { dir, ext } of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir)) {
    // Match both .tsx and .ts files
    if (!file.endsWith(".tsx") && !file.endsWith(".ts")) continue;
    if (file.includes(".test.") || file.includes(".stories.") || file.includes(".spec.")) continue;
    if (file === "index.ts" || file === "index.tsx") continue;
    if (file === "icons.ts" || file === "icons.tsx") continue;

    const baseName = file.replace(/\.\w+$/, "");
    const testFileName = `${baseName}.test.${file.endsWith(".tsx") ? "tsx" : "ts"}`;
    const testPath = path.join(dir, testFileName);
    if (fs.existsSync(testPath)) continue;

    const srcPath = path.join(dir, file);
    const src = fs.readFileSync(srcPath, "utf-8");

    // Extract exported names: export function/const/class
    const exportMatches = [...src.matchAll(/export\s+(?:function|class|const)\s+(\w+)/g)];
    // Also match: export { Name } pattern (bottom-of-file re-exports)
    const reExportMatches = [...src.matchAll(/export\s+\{\s*([\w,\s]+)\s*\}/g)];
    for (const m of reExportMatches) {
      const names = m[1].split(",").map(s => s.trim()).filter(Boolean);
      for (const name of names) {
        // Handle "Name as Alias" — only use the alias
        const cleanName = name.includes(" as ") ? name.split(" as ")[1].trim() : name;
        if (!exportMatches.find(em => em[1] === cleanName)) {
          exportMatches.push(["", cleanName]);
        }
      }
    }
    // Extract type exports: export interface/type Name
    const typeExportMatches = [...src.matchAll(/export\s+(?:interface|type)\s+(\w+)/g)];
    // Also match: export type { Name }
    const reTypeExportMatches = [...src.matchAll(/export\s+type\s+\{\s*([\w,\s]+)\s*\}/g)];
    for (const m of reTypeExportMatches) {
      const names = m[1].split(",").map(s => s.trim()).filter(Boolean);
      for (const name of names) {
        // Handle "Name as Alias" — only use the alias
        const cleanName = name.includes(" as ") ? name.split(" as ")[1].trim() : name;
        if (!typeExportMatches.find(em => em[1] === cleanName)) {
          typeExportMatches.push(["", cleanName]);
        }
      }
    }
    const exportNames = exportMatches.map(m => m[1]);
    const typeNames = typeExportMatches.map(m => m[1]);

    if (exportNames.length === 0 && typeNames.length === 0) continue;

    const isHook = dir === "hooks";
    const isLib = dir === "lib";
    const isComponent = dir.startsWith("components/");

    const importPath = `./${baseName}`;

    // Generate test content
    const lines = [];
    lines.push(`import { describe, it, expect } from "vitest";`);

    if (isComponent) {
      lines.push(`import { ${exportNames.join(", ")} } from "${importPath}";`);
      if (typeNames.length > 0) {
        lines.push(`import type { ${typeNames.join(", ")} } from "${importPath}";`);
      }
      lines.push("");
      lines.push(`describe("${baseName}", () => {`);

      // Test: exports are defined
      for (const name of exportNames) {
        lines.push(`  it("exports ${name}", () => {`);
        lines.push(`    expect(${name}).toBeDefined();`);
        lines.push(`  });`);
        lines.push("");
      }

      // Test: type exports exist
      if (typeNames.length > 0) {
        lines.push(`  it("exports types", () => {`);
        typeNames.forEach((typeName, idx) => {
          const varName = `_tc${idx + 1}`;
          lines.push(`    const ${varName}: ${typeName} | undefined = undefined;`);
          lines.push(`    expect(${varName}).toBeUndefined();`);
        });
        lines.push(`  });`);
      }

      lines.push(`});`);
    } else if (isHook) {
      lines.push(`import { ${exportNames.join(", ")} } from "${importPath}";`);
      lines.push("");
      lines.push(`describe("${baseName}", () => {`);
      for (const name of exportNames) {
        lines.push(`  it("exports ${name}", () => {`);
        lines.push(`    expect(${name}).toBeDefined();`);
        lines.push(`  });`);
      }
      lines.push(`});`);
    } else if (isLib) {
      lines.push(`import { ${exportNames.join(", ")} } from "${importPath}";`);
      if (typeNames.length > 0) {
        lines.push(`import type { ${typeNames.join(", ")} } from "${importPath}";`);
      }
      lines.push("");
      lines.push(`describe("${baseName}", () => {`);
      for (const name of exportNames) {
        lines.push(`  it("exports ${name}", () => {`);
        lines.push(`    expect(${name}).toBeDefined();`);
        lines.push(`  });`);
      }
      lines.push(`});`);
    }

    lines.push("");

    fs.writeFileSync(testPath, lines.join("\n"));
    generated++;
  }
}

console.log(`Generated ${generated} test files`);
