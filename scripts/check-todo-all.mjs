import fs from "node:fs";

let content = fs.readFileSync("todo.md", "utf8");

// Chat system components - mark as done
const chatComps = [
  "chat-shell", "chat-sidebar", "chat-header", "chat-message-group",
  "chat-message-actions", "chat-thinking-block", "chat-tool-call-block",
  "chat-code-block", "chat-markdown-renderer", "chat-card-message",
  "chat-image-gallery", "chat-voice-message", "chat-input-toolbar",
  "chat-mention-picker", "chat-command-menu", "chat-streaming-text",
  "chat-suggest-replies", "chat-context-panel", "chat-model-switcher",
  "chat-agent-status", "chat-artifact-panel", "chat-feedback",
  "chat-conversation", "chat-conversation-search", "chat-branch",
  "chat-shared-link", "chat-message-input", "chat-message-bubble",
];

// Mark chat component items
for (const comp of chatComps) {
  // Match: - [ ] **P1** `chat-xxx` —— or - [ ] **P2** `chat-xxx` ——
  const regex = new RegExp(`^- \\[ \\] (\\*\\*P[12]\\*\\*) \`${comp}\` —`, "gm");
  content = content.replace(regex, (match, p1) => match.replace("- [ ]", "- [x]") + " ✅");
}

// Low-code components
const lowCodeComps = ["form-designer", "form-designer-runtime", "workflow-designer", "workflow-preview", "rule-editor"];
for (const comp of lowCodeComps) {
  const regex = new RegExp(`^- \\[ \\] (\\*\\*P[12]\\*\\*) \`${comp}\` —`, "gm");
  content = content.replace(regex, (match) => match.replace("- [ ]", "- [x]") + " ✅");
}

// Mobile components
const mobileComps = [
  "mobile-page-shell", "mobile-action-sheet", "mobile-picker", "mobile-camera",
  "mobile-qrcode-scanner", "mobile-signature", "mobile-geolocation",
  "mobile-infinite-scroll", "mobile-tab-bar", "mobile-list-item",
];
for (const comp of mobileComps) {
  const regex = new RegExp(`^- \\[ \\] (\\*\\*P[12]\\*\\*) \`${comp}\` —`, "gm");
  content = content.replace(regex, (match) => match.replace("- [ ]", "- [x]") + " ✅");
}

// Business components from stage 1
const bizComps = [
  "master-edit-template", "master-list-template", "photo-audit", "operation-log",
  "bill-todo-list", "serial-number-manager", "dynamic-form-builder", "flow-tracker",
  "rebut-node-select", "approval-flow", "approval-action-bar", "bill-timeline",
  "oa-bridge", "chart-suite", "funnel-chart", "gantt-chart", "calendar-view",
  "resource-schedule", "timeline-view", "heatmap-chart", "map-chart",
  "dashboard-canvas", "bar-list", "delta-bar", "category-bar", "callout",
  "badge-delta", "tracking", "chart-card", "stat-card-with-sparkline",
  "donut-card", "customer-browse", "product-browse", "sales-order-browse",
  "writeoff-browse", "price-adjust-browse", "fee-type-browse",
  "shipping-way-browse", "warehouse-browse", "company-browse", "city-browse",
  "tax-detail-table", "writeoff-flow", "budget-overview", "target-progress",
  "inventory-snapshot", "invoice-summary", "account-balance",
  "reconciliation-line-editor", "sales-target-editor", "marketing-activity-form",
  "policy-line-editor", "application-form", "reconciliation-summary",
  "settlement-status-tag", "sign-action-button", "invoice-manager",
  "payment-schedule", "bill-print-template", "template-download",
  "import-error-table", "batch-print-dialog", "print-template-builder",
  "print-service", "attachment-uploader", "attachment-list",
  "attachment-preview", "image-gallery", "file-card", "paste-upload",
  "task-list-table", "quick-entry-grid", "announcement-card",
  "performance-rank-table", "pool-tracker-table", "async-task-trigger",
  "task-progress", "task-history", "feature-tour", "preference-panel",
  "dock-panel", "tab-pin",
];
for (const comp of bizComps) {
  const regex = new RegExp(`^- \\[ \\] (\\*\\*P[012]\\*\\*) \`${comp}\` —`, "gm");
  content = content.replace(regex, (match) => match.replace("- [ ]", "- [x]") + " ✅");
}

fs.writeFileSync("todo.md", content);

const remaining = (content.match(/^- \[ \]/gm) || []).length;
const done = (content.match(/^- \[x\]/gm) || []).length;
console.log(`Done: ${done}, Remaining: ${remaining}`);
