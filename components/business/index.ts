"use client";

// Mobile surface lives on `@chaos_team/chaos-ui/mobile` only.
// Do not re-export mobile modules from the business barrel (layer hygiene).

export * from "./activity-feed";
// AdvancedDataTable — deprecated named export only (see bottom of file).
// Prefer SearchTable / DataTable / ProTable for new work.
export * from "./advanced-search";
export * from "./announcement-banner";
export * from "./approval-timeline";
export * from "./async-task-center";
export * from "./audience-segment-builder";
export {
  AuditLog,
  type AuditLogStatus,
  type AuditLogEntry,
  type AuditLogProps,
} from "./audit-log";
export * from "./audit-sidebar";
export * from "./auth-guard";
export * from "./permission-wrapper";
export * from "./global-loading";
export * from "./edit-toolbar";
export * from "./print-button";
export * from "./import-dialog";
export * from "./avatar-group";
export * from "./bill-footer";
export * from "./bill-header";
export * from "./bill-page";
export * from "./bill-status-bar";
export * from "./biz-status-tag";
export * from "./budget-pacing-card";
export * from "./bulk-actions-toolbar";
export * from "./bulk-import-wizard";
export * from "./campaign-calendar";
export * from "./campaign-card";
export * from "./campaign-status-tag";
export * from "./channel-picker";
export * from "./chart";
export * from "./chip";
export * from "./code-block";
export * from "./code-editor";
export * from "./command-palette";
export * from "./confirm-dialog";
export * from "./cookie-banner";
export {
  CrudPage,
  type CrudPageProps,
  type FormField as CrudFormField,
} from "./crud-page";
export * from "./crud-toolbar";
export * from "./creative-preview";
export * from "./data-table";
export * from "./date-range-picker";
export * from "./diff-viewer";
export * from "./dict-select";
export {
  DictManageDialog,
  type DictManageDialogProps,
  type DictManageItem,
  type DictManageFetcher,
} from "./dict-manage-dialog";
export {
  RemoteSelect,
  type RemoteSelectProps,
  type RemoteOption,
  type RemoteFetcher,
} from "./remote-select";

export * from "./error-boundary";
export * from "./expense-line-editor";
export * from "./experiment-summary";
export * from "./export-button";
export * from "./field-mask";
export * from "./file-upload-manager";
export * from "./filter-bar";
export * from "./filter-builder";
export * from "./forbidden";
export * from "./form-field";
export * from "./form-dialog";
export * from "./form-wizard";
export * from "./refresh-button";
export * from "./record-count";
export * from "./list-page-shell";
export * from "./gauge";
export * from "./heatmap-calendar";
export * from "./inline-edit";
export * from "./json-editor";
export * from "./json-viewer";
export * from "./kanban-board";
export * from "./kpi-card";
export * from "./language-switcher";
export * from "./line-editor";
export * from "./loading-page";
export * from "./metric-trend";
export * from "./multi-select";
export * from "./notification-center";
export {
  MessageCenter,
  messageCenter,
  useMessageCenter,
  type MessageCenterProps,
  type MessageCenterApi,
  type MessageItem,
} from "./message-center";
export * from "./order-line-editor";
export * from "./page-header";
export * from "./page-chrome";
export * from "./permission-matrix";
export * from "./pivot-table";
export * from "./prompt-dialog";
export * from "./responsive-preview";
export * from "./role-assignment";
export * from "./saved-filters";
export { SearchTable, type SearchTableProps } from "./search-table";
export * from "./social-share";
export { SqlEditor, type SqlEditorProps } from "./sql-editor";
export * from "./stat-card";
export * from "./stat-card-row";
export * from "./status-tag";
export * from "./user-menu";
export * from "./utm-builder";
export * from "./version-history";

export * from "./color-tag";

export {
  StatusBadge,
  type StatusBadgeProps,
  type StatusPreset,
  type StatusMapping,
} from "./status-badge";

// Top-level convenience re-exports of lib utilities so consumers don't import
// from the internal `./lib` path. message + format* are the most-used.
// / 顶层便捷导出：消费方不再从内部 ./lib 路径引入 message / format*。
export {
  message,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatNumber,
  formatPercent,
  formatRelativeTime,
} from "../../lib";
export type { MessageOptions, MessageType } from "../../lib";

// Layout: use @chaos_team/chaos-ui/layout (no re-export from business).

// --- auto-generated: stage 1 components ---
export * from "./master-edit-template";
export * from "./master-list-template";
export * from "./photo-audit";
export * from "./operation-log";
export * from "./bill-todo-list";
export * from "./serial-number-manager";
export * from "./dynamic-form-builder";
export * from "./flow-tracker";
export * from "./rebut-node-select";
export * from "./approval-flow";
export * from "./approval-action-bar";
export * from "./bill-timeline";
export * from "./oa-bridge";
export * from "./chart-suite";
export * from "./funnel-chart";
export * from "./gantt-chart";
export * from "./calendar-view";
export * from "./resource-schedule";
export * from "./timeline-view";
export * from "./heatmap-chart";
export * from "./map-chart";
export * from "./map-marker";
export * from "./map-track";
export * from "./map-view";
export * from "./dashboard-canvas";
export * from "./bar-list";
export * from "./delta-bar";
export * from "./category-bar";
export * from "./callout";
export * from "./badge-delta";
export * from "./tracking";
export * from "./chart-card";
export * from "./stat-card-with-sparkline";
export * from "./donut-card";
export * from "./customer-browse";
export * from "./product-browse";
export * from "./sales-order-browse";
export * from "./writeoff-browse";
export * from "./price-adjust-browse";
export * from "./fee-type-browse";
export * from "./shipping-way-browse";
export * from "./warehouse-browse";
export * from "./company-browse";
export * from "./city-browse";
export * from "./tax-detail-table";
export * from "./writeoff-flow";
export * from "./budget-overview";
export * from "./target-progress";
export * from "./inventory-snapshot";
export * from "./invoice-summary";
export * from "./account-balance";
export * from "./reconciliation-line-editor";
export * from "./sales-target-editor";
export * from "./marketing-activity-form";
export * from "./policy-line-editor";
export * from "./application-form";
export * from "./reconciliation-summary";
export * from "./settlement-status-tag";
export * from "./sign-action-button";
export * from "./invoice-manager";
export * from "./checkout-bar";
export * from "./coupon-card";
export * from "./invite-link";
export * from "./payment-method-selector";
export * from "./payment-result";
export * from "./payment-schedule";
export * from "./bill-print-template";
export * from "./template-download";
export * from "./import-error-table";
export * from "./batch-print-dialog";
export * from "./print-template-builder";
export * from "./print-service";
export * from "./attachment-uploader";
export * from "./attachment-list";
export * from "./attachment-preview";
export * from "./image-gallery";
export * from "./file-card";
export * from "./paste-upload";
export * from "./task-list-table";
export * from "./quick-entry-grid";
export * from "./announcement-card";
export * from "./performance-rank-table";
export * from "./pool-tracker-table";
export * from "./async-task-trigger";
export * from "./task-progress";
export * from "./task-history";
export * from "./feature-tour";
export * from "./preference-panel";
export * from "./dock-panel";
export * from "./tab-pin";

// --- auto-generated: chat/lowcode/mobile ---
export * from "./chat-shell";
export * from "./chat-sidebar";
export * from "./chat-header";
export * from "./chat-message-group";
export * from "./chat-message-actions";
export * from "./chat-thinking-block";
export * from "./chat-tool-call-block";
export * from "./chat-code-block";
export * from "./chat-markdown-renderer";
export * from "./rich-text-editor";
export * from "./org-chart";
export * from "./pdf-viewer";
export * from "./color-board";
export * from "./markdown-editor";
export * from "./cron-editor";
export * from "./chat-card-message";
export * from "./chat-image-gallery";
export * from "./chat-voice-message";
export * from "./chat-input-toolbar";
export * from "./chat-mention-picker";
export * from "./chat-command-menu";
export * from "./chat-streaming-text";
export * from "./chat-suggest-replies";
export * from "./chat-context-panel";
export * from "./chat-model-switcher";
export * from "./chat-agent-status";
export * from "./chat-artifact-panel";
export * from "./chat-feedback";
export * from "./chat-conversation";
export * from "./chat-conversation-search";
export * from "./chat-branch";
export * from "./chat-shared-link";
export * from "./chat-message-input";
export * from "./chat-message-bubble";
export * from "./form-designer";
/** @deprecated Prefer business SchemaForm. */
export { FormDesignerRuntime } from "./form-designer-runtime";
export type { FormDesignerRuntimeProps } from "./form-designer-runtime";
export * from "./workflow-designer";
export * from "./workflow-preview";
export * from "./rule-editor";
export * from "./mobile-page-shell";
export * from "./mobile-action-sheet";
export * from "./mobile-picker";
export * from "./mobile-camera";
export * from "./mobile-qrcode-scanner";
export * from "./mobile-signature";
export * from "./mobile-geolocation";
export * from "./mobile-infinite-scroll";
export * from "./mobile-tab-bar";
export * from "./mobile-list-item";

// ─── P1 new business components ──────────────────────────────────
export * from "./tree-table";
export * from "./org-admin-page";
export * from "./editable-tree-table";
export * from "./diff-viewer-table";
export * from "./address-picker";
export * from "./batch-selector";
export * from "./shift-calendar";
export * from "./equipment-card";
export * from "./maintenance-log";
export * from "./media-recorder";
export * from "./quality-inspection-form";
export * from "./inventory-alert-list";
export * from "./unit-converter";
export * from "./formula-editor";
export * from "./red-packet";
export * from "./report-builder";
export * from "./dashboard-designer";
export * from "./contract-template";
export * from "./browse-dialog";
export {
  BrowserField,
  registerBrowserType,
  getBrowserTypeConfig,
  type BrowserFieldProps,
  type BrowserType,
  type BrowserTypeConfig,
  type BrowserLabel,
  type BrowseItem,
} from "./browser-field";
export {
  SchemaForm,
  type SchemaFormProps,
  type FormSchema,
  type FormGroupSchema,
  type FormFieldSchema,
  type FormFieldRule,
  type FormFieldDependency,
  type FieldType,
} from "./schema-form";
export {
  ReportTable,
  type ReportTableProps,
  type ReportColumn,
  type ReportLoadParams,
  type ReportLoadResult,
  type ReportDataType,
  type ReportRender,
} from "./report-table";
export { PaginationBar, type PaginationBarProps } from "./pagination-bar";
export { notify, type NotifyApi, type NotifyInboxOptions } from "./notify";

export { AreaChart } from "./area-chart";
export type { AreaChartProps } from "./area-chart";
export { BarChart } from "./bar-chart";
export type { BarChartProps } from "./bar-chart";
export { BarListCard } from "./bar-list-card";
export type { BarListCardProps } from "./bar-list-card";
export { BudgetAllocator } from "./budget-allocator";
export type { BudgetAllocatorProps } from "./budget-allocator";
export { CompanyPicker } from "./company-picker";
export type { CompanyPickerProps } from "./company-picker";
export { CostCenterPicker } from "./cost-center-picker";
export type { CostCenterPickerProps } from "./cost-center-picker";
export { CustomerPicker } from "./customer-picker";
export type { CustomerPickerProps } from "./customer-picker";
export { DashboardGrid } from "./dashboard-grid";
export type { DashboardGridProps } from "./dashboard-grid";
export { DepartmentPicker } from "./department-picker";
export type { DepartmentPickerProps } from "./department-picker";
export { DistributorPicker } from "./distributor-picker";
export type { DistributorPickerProps } from "./distributor-picker";
export { DonutChart } from "./donut-chart";
export type { DonutChartProps } from "./donut-chart";
export { EmployeePicker } from "./employee-picker";
export type {
  EmployeePickerProps,
  EmployeePickerOption,
  EmployeePickerFetcher,
} from "./employee-picker";
export { ErrorPage, NotFound, InternalError, Unauthorized } from "./error-page";
export { GaugeChart } from "./gauge-chart";
export type { GaugeChartProps } from "./gauge-chart";
export { ImMessage } from "./im-message";
export type { ImMessageProps } from "./im-message";
export { KanbanColumn } from "./kanban-column";
export type { KanbanColumnProps } from "./kanban-column";
export { LineChart } from "./line-chart";
export type { LineChartProps } from "./line-chart";
export { MessageList } from "./message-list";
export type { MessageListProps } from "./message-list";
export { OverviewPage } from "./overview-page";
export type { OverviewPageProps } from "./overview-page";
export { PermissionButton } from "./permission-button";
export type { PermissionButtonProps } from "./permission-button";
export { PieChart } from "./pie-chart";
export type { PieChartProps } from "./pie-chart";
export { ProductCategoryPicker } from "./product-category-picker";
export type { ProductCategoryPickerProps } from "./product-category-picker";
export { PromotionRuleCard } from "./promotion-rule-card";
export type { PromotionRuleCardProps } from "./promotion-rule-card";
export { PromotionRuleEditor } from "./promotion-rule-editor";
export type { PromotionRuleEditorProps } from "./promotion-rule-editor";
export { RadarChart } from "./radar-chart";
export type { RadarChartProps } from "./radar-chart";
export { RadialChart } from "./radial-chart";
export type { RadialChartProps } from "./radial-chart";
export { RegionPicker } from "./region-picker";
export type { RegionPickerProps } from "./region-picker";
export { SankeyChart } from "./sankey-chart";
export type { SankeyChartProps } from "./sankey-chart";
export { ScatterChart } from "./scatter-chart";
export type { ScatterChartProps } from "./scatter-chart";
export { SkuPicker } from "./sku-picker";
export type { SkuPickerProps } from "./sku-picker";
export { SparkChart } from "./spark-chart";
export type { SparkChartProps } from "./spark-chart";
export { StatCardWithDelta } from "./stat-card-with-delta";
export type { StatCardWithDeltaProps } from "./stat-card-with-delta";
export { SubformTabs } from "./subform-tabs";
export type { SubformTabsProps } from "./subform-tabs";
export { TabCrudPage } from "./tab-crud-page";
export type { TabCrudPageProps } from "./tab-crud-page";
export { ThemeToggle } from "./theme-toggle";
export { TodoListTable } from "./todo-list-table";
export type { TodoListTableProps } from "./todo-list-table";
export { TreeCrudPage } from "./tree-crud-page";
export type { TreeCrudPageProps } from "./tree-crud-page";
export { TreemapChart } from "./treemap-chart";
export type { TreemapChartProps } from "./treemap-chart";
export { WarehousePicker } from "./warehouse-picker";
export type { WarehousePickerProps } from "./warehouse-picker";
export { WaterfallChart } from "./waterfall-chart";
export type { WaterfallChartProps } from "./waterfall-chart";

// ─── P2 new business components ───────────────────────────────────

// P2-A: General business components
export * from "./gantt-chart-pro";
export * from "./journal-entry-editor";
export * from "./bom-tree-editor";
export * from "./supplier-scorecard";
export * from "./multi-currency-input";
export * from "./import-mapping-wizard";
export * from "./audit-trail-diff";
export * from "./notification-rule-builder";

// P2-B: System-specific business components
export * from "./leave-request-form";
export * from "./meeting-room-booking";
export * from "./attendance-calendar";
export { PurchaseOrderEditor } from "./purchase-order-editor";
export type {
  PurchaseOrderEditorProps,
  POLineItem,
} from "./purchase-order-editor";
export * from "./stock-transfer-dialog";
export * from "./ar-ap-aging-table";
export * from "./lead-pipeline-board";
export * from "./quotation-line-editor";
export * from "./customer-360-card";
export * from "./spc-control-chart";
export * from "./oee-dashboard";
export { BatchGenealogyTree } from "./batch-genealogy-tree";
export type { BatchGenealogyTreeProps } from "./batch-genealogy-tree";
export * from "./work-order-card";

// P2-C: Nice-to-have business components
export * from "./seal-stamp-registry";
export * from "./vehicle-booking";
export * from "./commission-calculator";
export * from "./territory-map";
export * from "./label-designer";
export * from "./iot-sensor-grid";
export * from "./compliance-checklist";
export * from "./i18n-form-field";

// ─── Alias exports for consumer compatibility ──────────────────────
/** @deprecated Use `BOMTreeEditor` (proper acronym casing). Will be removed in 2.0. */
export { BOMTreeEditor as BomTreeEditor } from "./bom-tree-editor";
/** @deprecated Use `KPICard` (proper acronym casing). Will be removed in 2.0. */
export { KPICard as KpiCard } from "./kpi-card";
/** @deprecated Use `MapMarkerCluster` (semantic name). Will be removed in 2.0. */
export { MapMarkerCluster as MapMarker } from "./map-marker";
/** @deprecated Use `SPCControlChart` (proper acronym casing). Will be removed in 2.0. */
export { SPCControlChart as SpcControlChart } from "./spc-control-chart";
/** @deprecated Use `UTMBuilder` (proper acronym casing). Will be removed in 2.0. */
export { UTMBuilder as UtmBuilder } from "./utm-builder";
/** @deprecated Use `SearchTable` or `DataTable` (powered by @tanstack/react-table). Will be removed in 2.0. */
export { AdvancedDataTable } from "./advanced-data-table";

// ─── Enterprise UI 底座补齐 — 业务组件 ────────────────────────────
export { ProTable, ColumnSettings } from "./pro-table";
export type {
  ProTableProps,
  ProColumn,
  SavedView as ProSavedView,
  ExpandableConfig,
  ProTableExportPayload,
  ColumnSettingsProps,
  RowSelection as ProRowSelection,
  Pagination as ProPagination,
  Density as ProDensity,
} from "./pro-table";
export { LogViewer } from "./log-viewer";

export type { LogViewerProps, LogEntry } from "./log-viewer";
export { BarcodeScanner } from "./barcode-scanner";
export type { BarcodeScannerProps } from "./barcode-scanner";
export { ImageCropper } from "./image-cropper";
export type { ImageCropperProps } from "./image-cropper";
export { OrgPicker } from "./org-picker";
export type { OrgPickerProps, OrgNode, OrgMember } from "./org-picker";
export { UserPicker } from "./user-picker";
export type {
  UserPickerProps,
  UserItem,
  UserPickerLoadParams,
} from "./user-picker";
export { AddressInput } from "./address-input";
export type { AddressInputProps, AddressValue } from "./address-input";
export { MarkdownViewerBiz } from "./markdown-viewer-biz";
export type { MarkdownViewerBizProps } from "./markdown-viewer-biz";
export { AudioRecorder } from "./audio-recorder";
export type { AudioRecorderProps } from "./audio-recorder";
export { ScreenCapture } from "./screen-capture";
export type { ScreenCaptureProps } from "./screen-capture";
export { OrgTreeSelect } from "./org-tree-select";
export type { OrgTreeSelectProps } from "./org-tree-select";

// ─── P1.5 业务组件 — Sprint 3-5 必须组件 ──────────────────────────
export * from "./status-action-buttons";
export * from "./price-ladder-editor";
export * from "./price-match-result";
export * from "./gift-line-editor";
export * from "./invoice-title-picker";
export * from "./integration-exception-workbench";
export * from "./expense-pool-detail";
