export const meta = {
  name: 'ga-shell-implement',
  description: 'Implement 145 business shell components as real React components, in parallel by category',
  phases: [
    { title: 'Implement', detail: 'one agent per category batch, writes real implementations' },
    { title: 'Verify', detail: 'typecheck + test the whole business dir' },
  ],
}

const ROOT = 'D:\\Projects\\qxyfoods\\chaos_style'

const BATCHES = [
  { key: 'charts', label: 'charts (26): area/bar/donut/pie/gauge/funnel/gantt/heatmap/map/etc + chart-card/suite/calendar/callout/delta-bar/donut-card/stat-with-sparkline' },
  { key: 'chat', label: 'chat (28): chat-shell/sidebar/header/message-*/conversation/input-toolbar/markdown/code-block/thinking/tool-call/etc' },
  { key: 'designer', label: 'designer (5): form-designer, form-designer-runtime, rule-editor, workflow-designer, workflow-preview' },
  { key: 'mobile', label: 'mobile (10): mobile-page-shell/action-sheet/picker/camera/qrcode-scanner/signature/geolocation/infinite-scroll/tab-bar/list-item' },
  { key: 'browse', label: 'browse/picker (20): city/company/customer/product/sales-order/warehouse/fee-type/price-adjust/shipping-way/writeoff-browse + company/cost-center/customer/department/distributor/employee/product-category/region/sku/warehouse-picker' },
  { key: 'print', label: 'print (3): print-service, print-template-builder, template-download' },
  { key: 'attachment', label: 'attachment (3): file-card, image-gallery, paste-upload' },
  { key: 'task', label: 'task (6): feature-tour, flow-tracker, operation-log, task-history, task-list-table, task-progress' },
  { key: 'form', label: 'form (6): dynamic-form-builder, marketing-activity-form, policy-line-editor, promotion-rule-editor, sales-target-editor, subform-tabs' },
  { key: 'table', label: 'table (4): import-error-table, pool-tracker-table, tax-detail-table, todo-list-table' },
  { key: 'other-a', label: 'other-a (17): budget-allocator, dashboard-canvas/grid, dock-panel, im-message, inventory-snapshot, invoice-manager/summary, kanban-column, master-edit/list-template, message-list, oa-bridge, overview-page, payment-schedule, performance-rank-table, permission-button' },
  { key: 'other-b', label: 'other-b (17): photo-audit, preference-panel, promotion-rule-card, quick-entry-grid, rebut-node-select, reconciliation-summary, resource-schedule, serial-number-manager, settlement-status-tag, sign-action-button, tab-crud-page, tab-pin, target-progress, timeline-view, tracking, tree-crud-page, writeoff-flow' },
]

const SCHEMA = {
  type: 'object',
  properties: {
    implemented: { type: 'array', items: { type: 'string' } },
    skipped: { type: 'array', items: { type: 'string' } },
    notes: { type: 'string' },
  },
  required: ['implemented', 'notes'],
}

phase('Implement')

const results = await pipeline(
  BATCHES,
  (batch) => {
    const catFile = `${ROOT}/.claude/ga-work/cats/${batch.key}.json`
    return agent(
      `You are implementing shell components for the Chaos UI library's 1.0.0 GA release.

Working directory: ${ROOT}

FIRST read these two reference files in full:
1. .claude/ga-work/AGENT_GUIDE.md  — the complete implementation guide (tech stack, imports, chart patterns, a11y, exactOptionalPropertyTypes gotcha, test pattern, output format). Follow it exactly.
2. .claude/ga-work/cats/${batch.key}.json  — the array of shell metadata for THIS batch. Each entry has: name (kebab), comp (PascalCase component name), path (relative file path), props (Props interface name), body (the Props interface body), useClient.

For EACH shell in the JSON array:
1. Read the existing file at its \`path\` to see the full current shell (JSDoc + interface + function).
2. Overwrite the file with a REAL implementation that:
   - Keeps the existing JSDoc and Props interface name. If the Props body is degenerate (only \`className?: string\`), EXTEND the interface with sensible data fields appropriate to the component (e.g. charts get \`data: Array<{label:string;value:number;color?:string}>\`, browse dialogs get \`open/onOpenChange/onSelect/items\`, etc.) and give them defaults so \`<Comp />\` still compiles. Document new fields with JSDoc @param if practical.
   - Renders real, semantic, accessible UI that uses EVERY prop. Never an empty div / \`{null}\`.
   - Uses \`cn()\` and \`data-slot="<name>"\` on the root.
   - Follows the a11y rules in the guide (icon-only buttons get aria-label, keyboard handlers, proper roles/semantics).
3. Also write a test file \`components/business/<name>.test.tsx\` next to it (if one already exists, overwrite it with a real interaction test that asserts visible rendered output via @testing-library/react \`screen.getByText\`). For components that need Base UI portal context and won't render in jsdom, test the type export + module import + any non-portal rendering.

BATCH: ${batch.label}

CONSTRAINTS:
- Do NOT modify components/business/index.ts (barrel already exports everything).
- Do NOT modify any files outside your batch's component list (+ their test files).
- Use only the imports listed in AGENT_GUIDE.md. If you need a lucide icon not in the guide's list, append it to components/ui/icons.ts first (one line: \`export const XIcon = Lucide.XIcon;\` in the supplementary block).
- Match the codebase style: named exports, \`import * as React from "react"\` only when you use React (hooks, React.ReactNode, React.Fragment); otherwise omit the React import.
- Keep "use client" if the shell had it, or add it if you use hooks/state/event handlers.

After writing all files, run \`npx tsc --noEmit\` from ${ROOT} and fix any type errors in YOUR files (do not worry about errors in other batches' files — those are other agents' responsibility; but if an error is in a file YOU wrote, fix it). Iterate until your files are clean.

Return JSON: { implemented: [names], skipped: [names with reasons], notes: "brief" }`,
      { label: `impl:${batch.key}`, phase: 'Implement', schema: SCHEMA, effort: 'high' },
    )
  },
  // Stage 2: after each batch implements, run a targeted typecheck+test on that batch's files
  (impl, batch) => {
    if (!impl || !impl.implemented) return impl
    const files = impl.implemented.map((n) => `components/business/${n}.tsx components/business/${n}.test.tsx`).join(' ')
    return agent(
      `Verify the just-implemented batch "${batch.key}" in ${ROOT}.

The following components were implemented: ${impl.implemented.join(', ')}

Run:
  npx tsc --noEmit 2>&1 | grep -E "error TS" | grep -E "components/business/(${impl.implemented.join('|')})"

If there are type errors in ANY of these files, fix them directly (edit the file). Also run:
  npx vitest run components/business/${impl.implemented.map((n) => n + '.test.tsx').join(' ')} 2>&1 | tail -30

If any test fails, fix the component or test until green. Do NOT touch files outside this batch.

Return JSON: { implemented: ${JSON.stringify(impl.implemented)}, skipped: ${JSON.stringify(impl.skipped || [])}, notes: "verification result + any fixes applied" }`,
      { label: `verify:${batch.key}`, phase: 'Verify', schema: SCHEMA, effort: 'medium' },
    )
  },
)

return results.filter(Boolean)
