import fs from "node:fs";

let content = fs.readFileSync("todo.md", "utf8");

// Extract all component items: - [ ] **P0** `component-name` ——
const pattern = /^- \[ \] (\*\*P[012]\*\*) `([a-z][a-z0-9-]+)`/gm;
let match;
const replacements = [];

while ((match = pattern.exec(content)) !== null) {
  const fullLine = match[0];
  const priority = match[1];
  const compName = match[2];

  // Check if component file exists
  const paths = [
    `components/ui/${compName}.tsx`,
    `components/business/${compName}.tsx`,
    `components/layout/${compName}.tsx`,
    `hooks/${compName}.ts`,
    `hooks/${compName}.tsx`,
    `lib/${compName}.ts`,
  ];

  const exists = paths.some((p) => fs.existsSync(p));
  if (exists) {
    const newLine = fullLine.replace("- [ ]", "- [x]") + " ✅";
    replacements.push([fullLine, newLine]);
  }
}

// Apply replacements
for (const [old, neu] of replacements) {
  content = content.replace(old, neu);
}

fs.writeFileSync("todo.md", content);

const remaining = (content.match(/^- \[ \]/gm) || []).length;
const done = (content.match(/^- \[x\]/gm) || []).length;
console.log(`Checked ${replacements.length} component items`);
console.log(`Done: ${done}, Remaining: ${remaining}`);
