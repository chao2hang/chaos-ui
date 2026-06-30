"use client";
import { cn } from "@/lib/utils";

/**
 * @component MobilePullRefresh
 * @category UI
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <MobilePullRefresh />
 * ```
 * 下拉刷新
 */
export interface MobilePullRefreshProps {
  className?: string;
}

function MobilePullRefresh({ className }: MobilePullRefreshProps) {
  return <div data-slot="mobile-pull-refresh" className={cn("", className)} />;
}

export { MobilePullRefresh };
