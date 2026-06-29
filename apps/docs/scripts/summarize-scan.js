const fs = require("fs")
const path = require("path")

const RAW = path.join(__dirname, "..", "docs", "playwright-results-raw.json")
const OUT = path.join(__dirname, "..", "docs", "playwright-results-summary.json")

const data = JSON.parse(fs.readFileSync(RAW, "utf8"))

function firstLine(s) {
  return s.split("\n")[0].trim()
}

function classifyError(msg) {
  if (msg.includes("cannot be a descendant of") || msg.includes("cannot contain a nested")) {
    return "hydration-nested-button"
  }
  if (msg.includes("Base UI:") && msg.includes("native button")) {
    return "base-ui-native-button"
  }
  if (msg.includes("does not recognize the") && msg.includes("prop on a DOM element")) {
    return "react-dom-unknown-prop"
  }
  if (msg.includes("Failed to fetch dynamically imported module")) {
    return "dynamic-import-failed"
  }
  if (msg.includes("Outdated Optimize Dep")) {
    return "vite-outdated-dep"
  }
  if (msg.includes("sb-addons/") && msg.includes("manager-bundle.js")) {
    return "sb-addon-mgr-404"
  }
  if (msg.includes("404")) {
    return "http-404"
  }
  if (msg.includes("NoStoryMatchError")) {
    return "no-story-match"
  }
  if (msg.includes("collapsible")) {
    return "non-bool-collapsible"
  }
  return "other"
}

const byId = {}
const byError = {}

for (const r of data) {
  const categories = new Set()
  const allMsgs = []
  for (const e of r.consoleErrors || []) {
    const c = classifyError(e)
    categories.add(c)
    allMsgs.push({ type: "console", category: c, msg: firstLine(e) })
  }
  for (const e of r.pageErrors || []) {
    const c = classifyError(e)
    categories.add(c)
    allMsgs.push({ type: "page", category: c, msg: firstLine(e) })
  }
  for (const e of r.failedRequests || []) {
    const c = classifyError(e)
    categories.add(c)
    allMsgs.push({ type: "net", category: c, msg: e })
  }

  if (categories.size > 0) {
    byId[r.id] = {
      status: r.status,
      durationMs: r.durationMs,
      categories: [...categories],
      messages: allMsgs,
    }
    for (const c of categories) {
      if (!byError[c]) byError[c] = []
      byError[c].push(r.id)
    }
  }
}

const out = {
  scannedAt: new Date().toISOString(),
  totalStories: data.length,
  storiesWithIssues: Object.keys(byId).length,
  cleanStories: data.length - Object.keys(byId).length,
  byErrorCategory: Object.fromEntries(
    Object.entries(byError).map(([k, v]) => [k, { count: v.length, stories: v }]),
  ),
  byId,
}

fs.writeFileSync(OUT, JSON.stringify(out, null, 2))
console.log(`[summary] ${out.storiesWithIssues} stories with issues, ${out.cleanStories} clean`)
console.log("[summary] by category:")
for (const [k, v] of Object.entries(byError).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  ${k}: ${v.length}`)
}
console.log(`[summary] -> ${OUT}`)
