import fs from "node:fs";
import path from "node:path";

const dirs = [
  { dir: "components/ui", pattern: /\.tsx$/ },
  { dir: "components/business", pattern: /\.tsx$/ },
  { dir: "components/layout", pattern: /\.tsx$/ },
  { dir: "hooks", pattern: /\.tsx?$/ },
  { dir: "lib", pattern: /\.ts$/ },
];

let total = 0;
let withTests = 0;
let withoutTests = 0;
const missing = [];

for (const { dir, pattern } of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir)) {
    if (!pattern.test(file)) continue;
    if (file.includes(".test.") || file.includes(".stories.") || file.includes(".spec.")) continue;
    if (file === "index.ts" || file === "index.tsx") continue;
    if (file === "icons.ts" || file === "icons.tsx") continue;

    const baseName = file.replace(/\.\w+$/, "");
    const testFile = `${baseName}.test.${file.endsWith(".tsx") ? "tsx" : "ts"}`;
    const testPath = path.join(dir, testFile);

    total++;
    if (fs.existsSync(testPath)) {
      withTests++;
    } else {
      withoutTests++;
      missing.push(path.join(dir, file));
    }
  }
}

console.log(`Total components: ${total}`);
console.log(`With tests: ${withTests}`);
console.log(`Without tests: ${withoutTests}`);
console.log(`\nMissing tests for:`);
missing.forEach(f => console.log(`  ${f}`));
