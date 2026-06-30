import fs from "node:fs";
import path from "node:path";

const dir = "components/business";
const files = fs.readdirSync(dir).filter(
  (f) => f.endsWith(".tsx") && !f.endsWith(".test.tsx") && !f.endsWith(".stories.tsx") && f !== "index.ts"
);

let fixed = 0;
for (const file of files) {
  const fp = path.join(dir, file);
  let c = fs.readFileSync(fp, "utf8");

  // Replace the spread pattern: don't spread custom props onto div
  // Old: {...props}
  // New: (nothing - just use className)
  if (c.includes("{...props}")) {
    c = c.replace(/\s*\{...props\}/, "");
    fixed++;
  }

  fs.writeFileSync(fp, c);
}

console.log(`Fixed ${fixed} files`);
