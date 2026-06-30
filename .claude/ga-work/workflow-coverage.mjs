export const meta = {
  name: "ga-coverage-lift",
  description: "Write deeper interaction tests for low-coverage components to reach 85% coverage",
  phases: [
    { title: "Test", detail: "one agent per batch writes/upgrade tests" },
    { title: "Verify", detail: "run the batch tests + typecheck" },
  ],
}

const ROOT = "D:\\Projects\\qxyfoods\\chaos_style"

const BATCHES = [
  { key: "ui-a", dir: "ui", files: ["components/ui/affix.tsx","components/ui/anchor.tsx","components/ui/autocomplete.tsx","components/ui/avatar.tsx","components/ui/back-top.tsx","components/ui/badge.tsx","components/ui/barcode-display.tsx","components/ui/breadcrumb.tsx","components/ui/browse-input.tsx","components/ui/button.tsx","components/ui/calendar.tsx","components/ui/card.tsx","components/ui/carousel.tsx","components/ui/cascader.tsx","components/ui/checkbox.tsx","components/ui/collapsible.tsx"] },
  { key: "ui-b", dir: "ui", files: ["components/ui/color-picker.tsx","components/ui/command.tsx","components/ui/context-menu.tsx","components/ui/countdown.tsx","components/ui/date-picker.tsx","components/ui/descriptions.tsx","components/ui/dialog.tsx","components/ui/divider.tsx","components/ui/dot.tsx","components/ui/drawer.tsx","components/ui/dropdown-menu.tsx","components/ui/empty-state.tsx","components/ui/fab.tsx","components/ui/file-upload.tsx","components/ui/flex.tsx","components/ui/form.tsx"] },
  { key: "ui-c", dir: "ui", files: ["components/ui/grid.tsx","components/ui/grid-layout.tsx","components/ui/hover-card.tsx","components/ui/image.tsx","components/ui/image-viewer.tsx","components/ui/input-number.tsx","components/ui/input-search.tsx","components/ui/input.tsx","components/ui/kbd.tsx","components/ui/keyboard-shortcut.tsx","components/ui/kpi-panel.tsx","components/ui/label.tsx","components/ui/list.tsx","components/ui/menubar.tsx","components/ui/modal.tsx","components/ui/notification.tsx"] },
  { key: "ui-d", dir: "ui", files: ["components/ui/otp-field.tsx","components/ui/page-container.tsx","components/ui/pagination.tsx","components/ui/popconfirm.tsx","components/ui/popover.tsx","components/ui/progress.tsx","components/ui/qrcode.tsx","components/ui/radio-group.tsx","components/ui/rating.tsx","components/ui/scroll-area.tsx","components/ui/segmented-control.tsx","components/ui/select.tsx","components/ui/separator.tsx","components/ui/sheet.tsx","components/ui/skeleton.tsx","components/ui/slider.tsx"] },
  { key: "ui-e", dir: "ui", files: ["components/ui/sonner.tsx","components/ui/space.tsx","components/ui/spinner.tsx","components/ui/split-pane.tsx","components/ui/stepper.tsx","components/ui/switch.tsx","components/ui/tabs.tsx","components/ui/tags-input.tsx","components/ui/textarea.tsx","components/ui/timeline.tsx","components/ui/toggle-group.tsx","components/ui/toggle.tsx","components/ui/tooltip.tsx","components/ui/tree-select.tsx","components/ui/tree-view.tsx","components/ui/virtual-list.tsx"] },
  { key: "ui-f", dir: "ui", files: ["components/ui/virtual-table.tsx","components/ui/department-browse.tsx","components/ui/user-browse.tsx","components/ui/accordion.tsx","components/ui/alert-dialog.tsx","components/ui/alert.tsx","components/ui/aspect-ratio.tsx","components/ui/config-provider.tsx","components/ui/form-grid.tsx","components/ui/form-list.tsx","components/ui/form-section.tsx"] },
  { key: "mobile-a", dir: "mobile", files: ["components/mobile/mobile-auth-layout.tsx","components/mobile/mobile-bottom-nav.tsx","components/mobile/mobile-button.tsx","components/mobile/mobile-card.tsx","components/mobile/mobile-dashboard-layout.tsx","components/mobile/mobile-data-table.tsx","components/mobile/mobile-dialog.tsx","components/mobile/mobile-empty-state.tsx","components/mobile/mobile-filter-builder.tsx","components/mobile/mobile-form-wizard.tsx","components/mobile/mobile-form.tsx","components/mobile/mobile-form-field.tsx"] },
  { key: "mobile-b", dir: "mobile", files: ["components/mobile/mobile-input.tsx","components/mobile/mobile-kanban.tsx","components/mobile/mobile-kpi-card.tsx","components/mobile/mobile-navigation.tsx","components/mobile/mobile-page-header.tsx","components/mobile/mobile-pull-to-refresh.tsx","components/mobile/mobile-select.tsx","components/mobile/mobile-sheet.tsx","components/mobile/mobile-skeleton.tsx","components/mobile/mobile-swipe-actions.tsx","components/mobile/mobile-tabs.tsx"] },
  { key: "layout-a", dir: "layout", files: ["components/layout/admin-breadcrumb.tsx","components/layout/admin-header.tsx","components/layout/admin-tabs.tsx","components/layout/auth-layout.tsx","components/layout/blank-layout.tsx","components/layout/dashboard-layout.tsx","components/layout/detail-layout.tsx","components/layout/error-layout.tsx"] },
  { key: "layout-b", dir: "layout", files: ["components/layout/error-page.tsx","components/layout/master-detail-tabs.tsx","components/layout/master-detail-layout.tsx","components/layout/print-layout.tsx","components/layout/public-layout.tsx","components/layout/region-layout.tsx","components/layout/top-bar.tsx","components/layout/dialog-form-body.tsx"] },
  { key: "hooks-a", dir: "hooks", files: ["hooks/use-clipboard.ts","hooks/use-field-validation.ts","hooks/use-hotkeys.ts","hooks/use-modal.tsx","hooks/use-infinite-scroll.ts","hooks/use-intersection-observer.ts","hooks/use-key.ts","hooks/use-copy-to-clipboard.ts","hooks/use-local-storage.ts","hooks/use-network-status.ts"] },
  { key: "hooks-b", dir: "hooks", files: ["hooks/use-notification.ts","hooks/use-scroll.ts","hooks/use-throttle.ts","hooks/use-click-outside.ts","hooks/use-confirm-async.tsx","hooks/use-orientation.ts","hooks/use-step.ts","hooks/use-window-size.ts","hooks/use-mobile.ts","hooks/use-visibility-change.ts"] },
  { key: "hooks-c", dir: "hooks", files: ["hooks/use-permission.tsx","hooks/use-media-query.ts","hooks/use-locale.tsx","hooks/use-page-title.ts","hooks/use-form.ts","hooks/use-crud.ts","hooks/use-breakpoint.ts","hooks/use-pagination.ts","hooks/use-event-listener.ts","hooks/use-countdown.ts"] },
  { key: "lib-a", dir: "lib", files: ["lib/security.ts","lib/url.ts","lib/message.ts","lib/modal.ts","lib/modal-store.tsx","lib/logger.ts","lib/api-client.ts","lib/storage.ts"] },
  { key: "business-a", dir: "business", files: ["components/business/activity-feed.tsx","components/business/announcement-banner.tsx","components/business/approval-timeline.tsx","components/business/audit-log.tsx","components/business/audit-sidebar.tsx","components/business/auth-guard.tsx","components/business/avatar-group.tsx","components/business/bill-footer.tsx","components/business/bill-header.tsx","components/business/bill-page.tsx","components/business/bill-status-bar.tsx","components/business/biz-status-tag.tsx","components/business/budget-pacing-card.tsx","components/business/bulk-actions-toolbar.tsx","components/business/bulk-import-wizard.tsx"] },
  { key: "business-b", dir: "business", files: ["components/business/campaign-calendar.tsx","components/business/campaign-card.tsx","components/business/campaign-status-tag.tsx","components/business/channel-picker.tsx","components/business/chip.tsx","components/business/code-block.tsx","components/business/color-tag.tsx","components/business/combobox.tsx","components/business/command-palette.tsx","components/business/confirm-dialog.tsx","components/business/cookie-banner.tsx","components/business/crud-page.tsx","components/business/crud-toolbar.tsx","components/business/creative-preview.tsx","components/business/data-table.tsx"] },
  { key: "business-c", dir: "business", files: ["components/business/date-range-picker.tsx","components/business/diff-viewer.tsx","components/business/dict-select.tsx","components/business/empty-state.tsx","components/business/error-boundary.tsx","components/business/expense-line-editor.tsx","components/business/experiment-summary.tsx","components/business/export-button.tsx","components/business/fab.tsx","components/business/field-mask.tsx","components/business/file-upload-manager.tsx","components/business/filter-bar.tsx","components/business/filter-builder.tsx","components/business/forbidden.tsx","components/business/form-field.tsx"] },
  { key: "business-d", dir: "business", files: ["components/business/form-wizard.tsx","components/business/gauge.tsx","components/business/heatmap-calendar.tsx","components/business/inline-edit.tsx","components/business/json-viewer.tsx","components/business/kanban-board.tsx","components/business/kpi-card.tsx","components/business/language-switcher.tsx","components/business/line-editor.tsx","components/business/loading-page.tsx","components/business/metric-trend.tsx","components/business/multi-select.tsx","components/business/notification-center.tsx","components/business/order-line-editor.tsx","components/business/page-header.tsx"] },
  { key: "business-e", dir: "business", files: ["components/business/permission-matrix.tsx","components/business/permission-wrapper.tsx","components/business/pivot-table.tsx","components/business/prompt-dialog.tsx","components/business/rating.tsx","components/business/remote-select.tsx","components/business/responsive-preview.tsx","components/business/role-assignment.tsx","components/business/saved-filters.tsx","components/business/search-table.tsx","components/business/segmented-control.tsx","components/business/stat-card.tsx","components/business/stat-card-row.tsx","components/business/status-badge.tsx","components/business/status-tag.tsx"] },
  { key: "business-f", dir: "business", files: ["components/business/time-picker.tsx","components/business/tour.tsx","components/business/transfer.tsx","components/business/user-menu.tsx","components/business/utm-builder.tsx","components/business/version-history.tsx","components/business/watermark.tsx","components/business/global-loading.tsx","components/business/edit-toolbar.tsx","components/business/print-button.tsx","components/business/import-dialog.tsx","components/business/permission-button.tsx","components/business/overview-page.tsx","components/business/im-message.tsx","components/business/message-list.tsx"] },
  { key: "business-g", dir: "business", files: ["components/business/stat-card-with-delta.tsx","components/business/dashboard-grid.tsx","components/business/donut-chart.tsx","components/business/pie-chart.tsx","components/business/line-chart.tsx","components/business/bar-chart.tsx","components/business/area-chart.tsx","components/business/radar-chart.tsx","components/business/scatter-chart.tsx","components/business/treemap-chart.tsx","components/business/sankey-chart.tsx","components/business/waterfall-chart.tsx","components/business/spark-chart.tsx","components/business/gauge-chart.tsx","components/business/radial-chart.tsx"] },
  { key: "business-h", dir: "business", files: ["components/business/company-picker.tsx","components/business/cost-center-picker.tsx","components/business/customer-picker.tsx","components/business/department-picker.tsx","components/business/distributor-picker.tsx","components/business/employee-picker.tsx","components/business/product-category-picker.tsx","components/business/region-picker.tsx","components/business/sku-picker.tsx","components/business/warehouse-picker.tsx","components/business/promotion-rule-card.tsx","components/business/promotion-rule-editor.tsx","components/business/subform-tabs.tsx","components/business/tab-crud-page.tsx","components/business/tree-crud-page.tsx"] },
  { key: "business-i", dir: "business", files: ["components/business/budget-allocator.tsx","components/business/dashboard-canvas.tsx","components/business/dock-panel.tsx","components/business/inventory-snapshot.tsx","components/business/invoice-manager.tsx","components/business/invoice-summary.tsx","components/business/kanban-column.tsx","components/business/master-edit-template.tsx","components/business/master-list-template.tsx","components/business/oa-bridge.tsx","components/business/payment-schedule.tsx","components/business/performance-rank-table.tsx","components/business/photo-audit.tsx","components/business/preference-panel.tsx","components/business/quick-entry-grid.tsx"] },
  { key: "business-j", dir: "business", files: ["components/business/rebut-node-select.tsx","components/business/reconciliation-summary.tsx"] },
]

const SCHEMA = {
  type: "object",
  properties: {
    tested: { type: "array", items: { type: "string" } },
    skipped: { type: "array", items: { type: "string" } },
    notes: { type: "string" },
  },
  required: ["tested", "notes"],
}

function testName(path) {
  return path.replace(/\.(tsx|ts)$/, (m) => ".test" + m)
}
function baseName(path) {
  return path.replace(/^.*\//, "").replace(/\.(tsx|ts)$/, "")
}

phase("Test")

const results = await pipeline(
  BATCHES,
  (batch) => {
    const files = batch.files
    const namesRe = files.map(baseName).join("|")
    const testFiles = files.map(testName).join(" ")
    return agent(
      "You are adding DEEPER interaction tests to low-coverage components in the Chaos UI library (D:\\Projects\\qxyfoods\\chaos_style) to reach the 85% GA coverage threshold. The components are ALREADY implemented (real, not shells) — you only improve TESTS.\n\n" +
      "Read .claude/ga-work/AGENT_GUIDE.md first for test conventions (vitest + @testing-library/react, @/ alias, Base UI portal components need type+module tests, prefer props that render visible output so screen.getByText works).\n\n" +
      'Your batch "' + batch.key + '" (' + batch.dir + ") source files:\n" +
      files.map((f) => "- " + f).join("\n") + "\n\n" +
      "For EACH source file:\n" +
      "1. Read the component source to understand props and rendered output.\n" +
      "2. Find/create its test file (same path with .test.tsx/.test.ts).\n" +
      "3. OVERWRITE/extend the test with REAL interaction tests exercising branches:\n" +
      "   - Render with props producing visible output; assert via screen.getByText / getByRole / getByLabelText.\n" +
      "   - Test interactions: fireEvent.click / userEvent.type, assert callbacks fire (vi.fn()) and UI updates.\n" +
      "   - Test conditional rendering: empty/disabled states, variants, error/edge branches.\n" +
      "   - Aim for the component own coverage >= 80%.\n" +
      "   - For Base UI portal components (Dialog/Popover/Select/Tooltip/Menu) that may not render portal content in jsdom: test type exports + module import + non-portal rendering (trigger button label). Try clicking the trigger to open since many do render.\n" +
      "   - Keep existing passing assertions; ADD to them. Do not delete type-export checks.\n\n" +
      "CONSTRAINTS:\n" +
      "- Do NOT modify component SOURCE files — only test files. If a component has a genuine bug blocking a test, note it in skipped.\n" +
      "- Do NOT modify any index.ts barrel.\n" +
      "- Tests must pass. Use only @testing-library/react, @testing-library/user-event, vitest. exactOptionalPropertyTypes ON.\n\n" +
      "After writing all tests, run from D:\\Projects\\qxyfoods\\chaos_style:\n" +
      '  npx tsc --noEmit 2>&1 | grep -E "error TS" | grep -E "' + namesRe + '"\n' +
      "Fix type errors in YOUR test files. Then:\n" +
      "  npx vitest run " + testFiles + " 2>&1 | tail -25\n" +
      "Fix failing tests. Iterate until green.\n\n" +
      'Return JSON: { tested: [file paths], skipped: [paths with reasons], notes: "brief" }',
      { label: "test:" + batch.key, phase: "Test", schema: SCHEMA, effort: "high" },
    )
  },
  (res, batch) => {
    if (!res || !res.tested || res.tested.length === 0) return res
    const files = batch.files
    const namesRe = files.map(baseName).join("|")
    const testFiles = files.map(testName).join(" ")
    return agent(
      'Verify batch "' + batch.key + '" tests in D:\\Projects\\qxyfoods\\chaos_style.\n\n' +
      "Run:\n" +
      '  npx tsc --noEmit 2>&1 | grep -E "error TS" | grep -E "' + namesRe + '"\n' +
      "Fix type errors in test files. Then:\n  npx vitest run " + testFiles + " 2>&1 | tail -25\n" +
      "Fix failing TESTS (do not modify component source). Iterate until all pass. Do NOT touch files outside this batch test files.\n\n" +
      "Return JSON: { tested: " + JSON.stringify(res.tested) + ", skipped: " + JSON.stringify(res.skipped || []) + ', notes: "verification result" }',
      { label: "verify:" + batch.key, phase: "Verify", schema: SCHEMA, effort: "medium" },
    )
  },
)

return results.filter(Boolean)
