import fs from "node:fs";
import path from "node:path";

// Update components/ui/index.ts
function updateBarrel(barrelPath, dir, pattern) {
  if (!fs.existsSync(barrelPath)) return;
  const content = fs.readFileSync(barrelPath, "utf-8");
  const files = fs.readdirSync(dir).filter(f => pattern.test(f) && !f.includes(".test.") && !f.includes(".stories.") && f !== "index.ts" && f !== "index.tsx" && f !== "icons.ts" && f !== "icons.tsx");
  
  const newExports = [];
  for (const file of files) {
    const baseName = file.replace(/\.\w+$/, "");
    const exportName = baseName.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("");
    const exportLine = `export { ${exportName} } from "./${baseName}";`;
    const typeLine = `export type { ${exportName}Props } from "./${baseName}";`;
    
    if (!content.includes(`./${baseName}`)) {
      newExports.push(exportLine);
      newExports.push(typeLine);
    }
  }
  
  if (newExports.length > 0) {
    fs.appendFileSync(barrelPath, "\n" + newExports.join("\n") + "\n");
    console.log(`Added ${newExports.length / 2} exports to ${barrelPath}`);
  }
}

updateBarrel("components/ui/index.ts", "components/ui", /\.tsx$/);
updateBarrel("components/business/index.ts", "components/business", /\.tsx$/);
updateBarrel("components/layout/index.ts", "components/layout", /\.tsx$/);

// Update hooks/index.ts
const hooksContent = fs.readFileSync("hooks/index.ts", "utf-8");
const hookFiles = fs.readdirSync("hooks").filter(f => f.endsWith(".ts") && !f.includes(".test.") && !f.includes("index.ts"));
const newHookExports = [];
for (const file of hookFiles) {
  const baseName = file.replace(".ts", "");
  const exportName = baseName.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const exportLine = `export { ${exportName} } from "./${baseName}";`;
  if (!hooksContent.includes(`./${baseName}`)) {
    newHookExports.push(exportLine);
  }
}
if (newHookExports.length > 0) {
  fs.appendFileSync("hooks/index.ts", "\n" + newHookExports.join("\n") + "\n");
  console.log(`Added ${newHookExports.length} hook exports`);
}

// Update lib/index.ts
const libContent = fs.readFileSync("lib/index.ts", "utf-8");
const libFiles = fs.readdirSync("lib").filter(f => f.endsWith(".ts") && !f.includes(".test.") && !f.includes("index.ts"));
const newLibExports = [];
for (const file of libFiles) {
  const baseName = file.replace(".ts", "");
  const exportName = baseName.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("").toLowerCase();
  const exportLine = `export * from "./${baseName}";`;
  if (!libContent.includes(`./${baseName}`)) {
    newLibExports.push(exportLine);
  }
}
if (newLibExports.length > 0) {
  fs.appendFileSync("lib/index.ts", "\n" + newLibExports.join("\n") + "\n");
  console.log(`Added ${newLibExports.length} lib exports`);
}
