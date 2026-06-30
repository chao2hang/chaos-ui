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

  // Check if React is used (besides the import line)
  const withoutImport = c.replace(/import \* as React from "react";/, "");
  const usesReact = /\bReact\./.test(withoutImport);

  if (!usesReact && c.includes('import * as React from "react";')) {
    c = c.replace(/import \* as React from "react";\n/, "");
    fixed++;
  }

  // Replace props.children access with null (since props spread already handles children)
  c = c.replace(/\{props\.children \?\? null\}/g, "{null}");

  fs.writeFileSync(fp, c);
}

console.log(`Fixed ${fixed} files`);
