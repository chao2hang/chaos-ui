import fs from "node:fs";

const components = [
  "master-edit-template","master-list-template","photo-audit","operation-log","bill-todo-list","serial-number-manager","dynamic-form-builder","flow-tracker","rebut-node-select","approval-flow","approval-action-bar","bill-timeline","oa-bridge","chart-suite","funnel-chart","gantt-chart","calendar-view","resource-schedule","timeline-view","heatmap-chart","map-chart","dashboard-canvas","bar-list","delta-bar","category-bar","callout","badge-delta","tracking","chart-card","stat-card-with-sparkline","donut-card","customer-browse","product-browse","sales-order-browse","writeoff-browse","price-adjust-browse","fee-type-browse","shipping-way-browse","warehouse-browse","company-browse","city-browse","tax-detail-table","writeoff-flow","budget-overview","target-progress","inventory-snapshot","invoice-summary","account-balance","reconciliation-line-editor","sales-target-editor","marketing-activity-form","policy-line-editor","application-form","reconciliation-summary","settlement-status-tag","sign-action-button","invoice-manager","payment-schedule","bill-print-template","template-download","import-error-table","batch-print-dialog","print-template-builder","print-service","attachment-uploader","attachment-list","attachment-preview","image-gallery","file-card","paste-upload","task-list-table","quick-entry-grid","announcement-card","performance-rank-table","pool-tracker-table","async-task-trigger","task-progress","task-history","feature-tour","preference-panel","dock-panel","tab-pin",
];

const lines = components.map((c) => `export * from "./${c}";`).join("\n");
let barrel = fs.readFileSync("components/business/index.ts", "utf8");
const marker = "// --- auto-generated: stage 1 components ---";
if (barrel.includes(marker)) {
  barrel = barrel.replace(marker + "\n", marker + "\n" + lines + "\n");
} else {
  barrel += "\n" + marker + "\n" + lines + "\n";
}
fs.writeFileSync("components/business/index.ts", barrel);
console.log("Added", components.length, "exports to barrel");
