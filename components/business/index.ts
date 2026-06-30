"use client";

export * from "./activity-feed";
// AdvancedDataTable removed from public barrel (deprecated — use SearchTable/DataTable).
// The file remains for backward-compat direct imports but is not part of the 1.0 public API.
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
export * from "./combobox";
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
  RemoteSelect,
  type RemoteSelectProps,
  type RemoteOption,
  type RemoteFetcher,
} from "./remote-select";
export * from "./empty-state";
export * from "./error-boundary";
export * from "./expense-line-editor";
export * from "./experiment-summary";
export * from "./export-button";
export * from "./fab";
export * from "./field-mask";
export * from "./file-upload-manager";
export * from "./filter-bar";
export * from "./filter-builder";
export * from "./forbidden";
export * from "./form-field";
export * from "./form-wizard";
export * from "./gauge";
export * from "./heatmap-calendar";
export * from "./inline-edit";
export * from "./json-viewer";
export * from "./kanban-board";
export * from "./kpi-card";
export * from "./language-switcher";
export * from "./line-editor";
export * from "./loading-page";
export * from "./metric-trend";
export * from "@/components/mobile/mobile-auth-layout";
export * from "@/components/mobile/mobile-button";
export * from "@/components/mobile/mobile-card";
export * from "@/components/mobile/mobile-dashboard-layout";
export * from "@/components/mobile/mobile-data-table";
export * from "@/components/mobile/mobile-dialog";
export * from "@/components/mobile/mobile-empty-state";
export * from "@/components/mobile/mobile-filter-builder";
export * from "@/components/mobile/mobile-form";
export * from "@/components/mobile/mobile-form-field";
export * from "@/components/mobile/mobile-form-wizard";
export * from "@/components/mobile/mobile-input";
export * from "@/components/mobile/mobile-kanban";
export * from "@/components/mobile/mobile-kpi-card";
export * from "@/components/mobile/mobile-navigation";
export * from "@/components/mobile/mobile-page-header";
export * from "@/components/mobile/mobile-pull-to-refresh";
export * from "@/components/mobile/mobile-select";
export * from "@/components/mobile/mobile-sheet";
export * from "@/components/mobile/mobile-skeleton";
export * from "@/components/mobile/mobile-swipe-actions";
export * from "@/components/mobile/mobile-tabs";
export * from "@/components/mobile/mobile-textarea";
export * from "./multi-select";
export * from "./notification-center";
export * from "./order-line-editor";
export * from "./page-header";
export * from "./permission-matrix";
export * from "./pivot-table";
export * from "./prompt-dialog";
export * from "./rating";
export * from "./responsive-preview";
export * from "./role-assignment";
export * from "./saved-filters";
export { SearchTable, type SearchTableProps } from "./search-table";
export * from "./segmented-control";
export * from "./stat-card";
export * from "./stat-card-row";
export * from "./status-tag";
export * from "./time-picker";
export * from "./tour";
export * from "./transfer";
export * from "./user-menu";
export * from "./utm-builder";
export * from "./version-history";
export * from "./watermark";

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

// Layout components re-exported for convenience / 便捷导出布局组件
export {
  DialogFormBody,
  FormStack,
} from "@/components/layout/dialog-form-body";
export type {
  DialogFormBodyProps,
  FormStackProps,
} from "@/components/layout/dialog-form-body";
export { MasterDetailLayout } from "@/components/layout/master-detail-layout";
export { AuthLayout } from "@/components/layout/auth-layout";
export type { AuthLayoutProps } from "@/components/layout/auth-layout";

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
