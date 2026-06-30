import fs from "node:fs";
import path from "node:path";

const dir = "components/business";
const newComponents = new Set([
  "master-edit-template","master-list-template","photo-audit","operation-log","bill-todo-list","serial-number-manager","dynamic-form-builder","flow-tracker","rebut-node-select","approval-flow","approval-action-bar","bill-timeline","oa-bridge","chart-suite","funnel-chart","gantt-chart","calendar-view","resource-schedule","timeline-view","heatmap-chart","map-chart","dashboard-canvas","bar-list","delta-bar","category-bar","callout","badge-delta","tracking","chart-card","stat-card-with-sparkline","donut-card","customer-browse","product-browse","sales-order-browse","writeoff-browse","price-adjust-browse","fee-type-browse","shipping-way-browse","warehouse-browse","company-browse","city-browse","tax-detail-table","writeoff-flow","budget-overview","target-progress","inventory-snapshot","invoice-summary","account-balance","reconciliation-line-editor","sales-target-editor","marketing-activity-form","policy-line-editor","application-form","reconciliation-summary","settlement-status-tag","sign-action-button","invoice-manager","payment-schedule","bill-print-template","template-download","import-error-table","batch-print-dialog","print-template-builder","print-service","attachment-uploader","attachment-list","attachment-preview","image-gallery","file-card","paste-upload","task-list-table","quick-entry-grid","announcement-card","performance-rank-table","pool-tracker-table","async-task-trigger","task-progress","task-history","feature-tour","preference-panel","dock-panel","tab-pin",
]);

let fixed = 0;
for (const name of newComponents) {
  const fp = path.join(dir, name + ".tsx");
  if (!fs.existsSync(fp)) continue;
  let c = fs.readFileSync(fp, "utf8");

  // Check if React is actually used
  const withoutImport = c.replace(/import \* as React from "react";/, "");
  const usesReact = /\bReact\./.test(withoutImport);

  if (!usesReact) {
    c = c.replace(/import \* as React from "react";\n/, "");
  }

  // Fix destructuring: remove children and rest if not needed
  // Replace: function Comp({ className, children, ...rest }: CompProps) {
  // With:    function Comp({ className }: CompProps) {
  c = c.replace(
    /function (\w+)\({ className, children, \.\.\.rest \}: (\w+Props)\)/,
    "function $1({ className }: $2)"
  );

  // Replace: {children ?? null} with {null}
  c = c.replace(/\{children \?\? null\}/g, "{null}");

  fs.writeFileSync(fp, c);
  fixed++;
}

console.log(`Fixed ${fixed} files`);
