export * from "./mobile-auth-layout";
export * from "./mobile-bottom-nav";
export * from "./mobile-button";
export * from "./mobile-card";
export * from "./mobile-checkout";
export * from "./mobile-dashboard-layout";
export * from "./mobile-data-table";
export * from "./mobile-dialog";
export * from "./mobile-empty-state";
export * from "./mobile-filter-builder";
export * from "./mobile-form-field";
export * from "./mobile-form-wizard";
export * from "./mobile-form";
export * from "./mobile-input";
export * from "./mobile-kanban";
export * from "./mobile-kpi-card";
export * from "./mobile-navigation";
export * from "./mobile-page-header";
export * from "./mobile-pull-to-refresh";
export * from "./mobile-select";
export * from "./mobile-share-sheet";
export * from "./mobile-sheet";
export * from "./mobile-skeleton";
export * from "./mobile-swipe-actions";
export * from "./mobile-swipe-card";
export * from "./mobile-tabs";
export * from "./mobile-textarea";

// Re-export from business for discoverability
export * from "@/components/business/mobile-qrcode-scanner";

// ─── Alias exports for consumer compatibility ──────────────────────
export { PullToRefresh as MobilePullToRefresh } from "./mobile-pull-to-refresh";
export { SwipeActions as MobileSwipeActions } from "./mobile-swipe-actions";
export { MobileKPICard as MobileKpiCard } from "./mobile-kpi-card";
export { MobileQrCodeScanner as MobileQrcodeScanner } from "@/components/business/mobile-qrcode-scanner";
export {
  MobileListItemSkeleton,
  MobileCardSkeleton,
  MobileDetailSkeleton,
} from "./mobile-skeleton";
import { MobileCardSkeleton as _MobileCardSkeleton } from "./mobile-skeleton";
/** @deprecated Use MobileListItemSkeleton / MobileCardSkeleton / MobileDetailSkeleton */
export const MobileSkeleton = _MobileCardSkeleton;