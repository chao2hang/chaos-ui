const fs = require("fs");
const path = require("path");
const c = JSON.parse(fs.readFileSync(path.join(__dirname, "coverage", "coverage-final.json"), "utf8"));
const want = ["use-notification", "use-scroll", "use-throttle", "use-click-outside", "use-confirm-async", "use-orientation", "use-step", "use-window-size", "use-mobile", "use-visibility-change"];
const total = (o) => Object.keys(o || {}).length;
const hit = (o) => Object.values(o || {}).filter((v) => v > 0).length;
const pct = (h, t) => (t === 0 ? "n/a" : Math.round((h / t) * 100) + "%");
for (const file of Object.keys(c)) {
  const norm = file.replace(/\\/g, "/");
  const name = norm.split("/").pop().replace(/\.(ts|tsx)$/, "");
  if (!want.includes(name)) continue;
  const d = c[file];
  const sh = hit(d.s), st = total(d.s);
  const bh = hit(d.b), bt = total(d.b);
  const fh = hit(d.f), ft = total(d.f);
  const lh = hit(d.l), lt = total(d.l);
  console.log(
    name.padEnd(24),
    "stmts", pct(sh, st).padStart(4),
    "branches", pct(bh, bt).padStart(4),
    "funcs", pct(fh, ft).padStart(4),
    "lines", pct(lh, lt).padStart(4),
  );
  // uncovered branches
  if (bt) {
    for (const [k, arr] of Object.entries(d.b)) {
      arr.forEach((v, i) => {
        if (v === 0) console.log("   uncovered branch", k, "idx", i, "locs", JSON.stringify((d.branchMap[k] && d.branchMap[k].locations || []).map((l) => l.start.line)));
      });
    }
  }
}
