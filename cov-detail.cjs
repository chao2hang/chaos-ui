const fs = require("fs");
const path = require("path");
const c = JSON.parse(fs.readFileSync(path.join(__dirname, "coverage", "coverage-final.json"), "utf8"));
for (const file of Object.keys(c)) {
  const norm = file.replace(/\\/g, "/");
  if (!norm.endsWith("hooks/use-confirm-async.tsx")) continue;
  const d = c[file];
  console.log("=== uncovered statements ===");
  for (const [k, v] of Object.entries(d.s)) {
    if (v === 0) {
      const loc = d.statementMap[k];
      console.log("stmt", k, "line", loc && loc.start && loc.start.line, JSON.stringify(loc));
    }
  }
  console.log("=== uncovered functions ===");
  for (const [k, v] of Object.entries(d.f)) {
    if (v === 0) {
      const loc = d.fnMap[k];
      console.log("fn", k, "name", loc && loc.name, "line", loc && loc.decl && loc.decl.start && loc.decl.start.line);
    }
  }
  console.log("=== all branch hit counts ===");
  for (const [k, arr] of Object.entries(d.b)) {
    const loc = d.branchMap[k];
    console.log("branch", k, "hits", JSON.stringify(arr), "line", loc && loc.line, "type", loc && loc.type, "locs", JSON.stringify((loc && loc.locs || []).map((l) => l.start.line)));
  }
}
