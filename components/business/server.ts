/**
 * RSC-safe business component entry.
 *
 * This entry re-exports ONLY pure display components — no hooks, no form
 * providers, no client-only state. It does NOT have a "use client" directive,
 * so Server Components can import from `@chaos_team/chaos-ui/business/server`
 * without pulling in react-hook-form or other client-only dependencies.
 *
 * For interactive components (forms, editors, pickers), import from
 * `@chaos_team/chaos-ui/business` instead.
 */

// Pure display components — safe for RSC
export { StatusActionButtons } from "./status-action-buttons";
export type {
  StatusActionButton,
  StatusActionButtonsProps,
} from "./status-action-buttons";
export { PriceMatchResult } from "./price-match-result";
export type {
  PriceMatchTier,
  PriceMatchResultProps,
} from "./price-match-result";
export { GiftLineEditor } from "./gift-line-editor";
export type { GiftLine, GiftLineEditorProps } from "./gift-line-editor";
export { InvoiceTitlePicker } from "./invoice-title-picker";
export type {
  InvoiceTitle,
  InvoiceTitlePickerProps,
} from "./invoice-title-picker";
export { IntegrationExceptionWorkbench } from "./integration-exception-workbench";
export type {
  IntegrationException,
  IntegrationExceptionWorkbenchProps,
  IntegrationType,
  ExceptionSeverity,
} from "./integration-exception-workbench";
export { ExpensePoolDetail } from "./expense-pool-detail";
export type {
  ExpensePool,
  ExpenseTransaction,
  ExpensePoolDetailProps,
} from "./expense-pool-detail";
export { PriceLadderEditor } from "./price-ladder-editor";
export type {
  PriceLadderTier,
  PriceLadderEditorProps,
} from "./price-ladder-editor";

// Existing pure display components
export { StatCard } from "./stat-card";
export { BizStatusTag } from "./biz-status-tag";
export { BarChart } from "./bar-chart";
export { LineChart } from "./line-chart";
export { PieChart } from "./pie-chart";
export { AreaChart } from "./area-chart";
export { RadarChart } from "./radar-chart";
export { ScatterChart } from "./scatter-chart";
export { ChartSuite } from "./chart-suite";
export { KPICard } from "./kpi-card";
