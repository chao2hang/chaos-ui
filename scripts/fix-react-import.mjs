import fs from "node:fs";
import path from "node:path";

const dirs = ["components/business", "components/layout"];
let fixed = 0;

for (const d of dirs) {
  for (const f of fs.readdirSync(d)) {
    if (!f.endsWith(".tsx") || f.endsWith(".test.tsx") || f.endsWith(".stories.tsx") || f === "index.ts") continue;
    const fp = path.join(d, f);
    let c = fs.readFileSync(fp, "utf8");
    const importLine = 'import * as React from "react";';
    if (c.includes(importLine)) {
      const withoutImport = c.replace(importLine, "");
      if (!/\bReact\./.test(withoutImport)) {
        c = c.replace(importLine + "\n", "");
        fs.writeFileSync(fp, c);
        fixed++;
      }
    }
  }
}

console.log(`Fixed ${fixed} files`);
