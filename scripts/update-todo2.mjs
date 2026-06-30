import fs from "node:fs";

const content = fs.readFileSync("todo.md", "utf-8");

// All P1/P2 component names that were just created
const componentNames = [
  "tree-crud-page", "tab-crud-page", "todo-list-table",
  "company-picker", "department-picker", "employee-picker",
  "distributor-picker", "sku-picker", "warehouse-picker",
  "region-picker", "product-category-picker", "cost-center-picker",
  "customer-picker", "promotion-rule-editor", "promotion-rule-card",
  "budget-allocator", "kanban-column", "gauge-chart",
  "with-permission", "permission-button", "message-list",
  "im-message", "split-screen", "article-layout",
  "print-template-layout", "embed-layout", "chat-message",
  "chat-input", "mobile-pull-refresh", "mobile-swipe-action",
  "area-chart", "bar-chart", "line-chart", "donut-chart",
  "pie-chart", "scatter-chart", "radial-chart", "spark-chart",
  "treemap-chart", "sankey-chart", "radar-chart", "waterfall-chart",
  "stat-card-with-delta", "bar-list-card", "dashboard-grid",
  "overview-page", "subform-tabs",
];

// Hook names
const hookNames = [
  "use-dict", "use-table", "use-form-table", "use-bill", "use-approval",
  "use-line-editor", "use-print", "use-export", "use-import", "use-data-scope",
  "use-websocket", "use-sse", "use-async-task", "use-fetch", "use-swr",
  "use-undo", "use-redo", "use-idle", "use-network-quality",
];

// Lib names
const libNames = ["date", "worker", "excel", "pdf", "crypto"];

// Docs that were created
const docsCreated = [
  "/docs/architecture.md",
  "/docs/design-tokens.md",
  "/docs/theming.md",
  "/docs/i18n.md",
  "/docs/migration.md",
  "/docs/performance.md",
  "/docs/testing.md",
  "/docs/monorepo.md",
];

// CI/CD items already done
const ciItems = [
  ".github/workflows/storybook-deploy.yml",
  ".github/workflows/chromatic.yml",
  ".github/workflows/labeler.yml",
  ".github/workflows/stale.yml",
  ".github/workflows/codeql.yml",
  ".github/CODEOWNERS",
  ".github/labeler.yml",
];

// DX items
const dxItems = [
  ".vscode/settings.json",
  ".vscode/extensions.json",
  "Codemod 脚本",
];

let result = content;
let count = 0;

// Check off component items
for (const name of componentNames) {
  const pattern = new RegExp(`^- \\[ \\] (\\*\\*P[12]\\*\\*) \`${name}\``, "m");
  if (pattern.test(result)) {
    result = result.replace(pattern, (match, p1) => match.replace("- [ ]", "- [x]") + " ✅");
    count++;
  }
}

// Check off hook items
for (const name of hookNames) {
  const pattern = new RegExp(`^- \\[ \\] (\\*\\*P[12]\\*\\*) \`${name}\``, "m");
  if (pattern.test(result)) {
    result = result.replace(pattern, (match, p1) => match.replace("- [ ]", "- [x]") + " ✅");
    count++;
  }
}

// Check off lib items
for (const name of libNames) {
  const pattern = new RegExp(`^- \\[ \\] (\\*\\*P[12]\\*\\*) \`${name}\``, "m");
  if (pattern.test(result)) {
    result = result.replace(pattern, (match, p1) => match.replace("- [ ]", "- [x]") + " ✅");
    count++;
  }
}

// Check off docs items
for (const doc of docsCreated) {
  const pattern = new RegExp(`^- \\[ \\] (\\*\\*P[12]\\*\\*) \`${doc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\``, "m");
  if (pattern.test(result)) {
    result = result.replace(pattern, (match) => match.replace("- [ ]", "- [x]") + " ✅");
    count++;
  }
}

// Check off CI items
for (const item of ciItems) {
  const pattern = new RegExp(`^- \\[ \\] (\\*\\*P[12]\\*\\*) \`${item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\``, "m");
  if (pattern.test(result)) {
    result = result.replace(pattern, (match) => match.replace("- [ ]", "- [x]") + " ✅");
    count++;
  }
}

// Check off DX items
for (const item of dxItems) {
  const pattern = new RegExp(`^- \\[ \\] (\\*\\*P[12]\\*\\*) ${item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "m");
  if (pattern.test(result)) {
    result = result.replace(pattern, (match) => match.replace("- [ ]", "- [x]") + " ✅");
    count++;
  }
}

// Check off specific items
const specificItems = [
  "评估 Changesets",
  "VS Code 工作区推荐",
  "VS Code 扩展推荐",
  "CSP 兼容",
  "React Server Components 兼容性",
  "引入 @axe-core/playwright",
  "添加 en-US / ja-JP / ko-KR",
];

for (const item of specificItems) {
  const pattern = new RegExp(`^- \\[ \\] (\\*\\*P[12]\\*\\*) ${item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "m");
  if (pattern.test(result)) {
    result = result.replace(pattern, (match) => match.replace("- [ ]", "- [x]") + " ✅");
    count++;
  }
}

fs.writeFileSync("todo.md", result);
console.log(`Checked off ${count} more items`);

// Count remaining
const remaining = (result.match(/^- \[ \]/gm) || []).length;
console.log(`Remaining unchecked: ${remaining}`);
