import fs from "node:fs";
import path from "node:path";

const dirs = ["components/ui", "components/business", "components/layout", "hooks", "lib"];
let fixed = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir)) {
    if (!file.includes(".test.")) continue;
    const fp = path.join(dir, file);
    const content = fs.readFileSync(fp, "utf-8");

    // Skip if no _typeCheck pattern
    if (!content.includes("_typeCheck")) continue;

    let result = content;
    let idx = 0;

    // Replace each "const _typeCheck:" with "const _tcN:" and the following "expect(_typeCheck)" with "expect(_tcN)"
    while (result.includes("const _typeCheck:")) {
      idx++;
      const varName = `_tc${idx}`;
      // Replace the declaration
      result = result.replace("const _typeCheck:", `const ${varName}:`);
      // Replace the corresponding expect() on the next line
      result = result.replace("expect(_typeCheck)", `expect(${varName})`);
    }

    if (result !== content) {
      fs.writeFileSync(fp, result);
      fixed++;
    }
  }
}

console.log(`Fixed ${fixed} test files`);
