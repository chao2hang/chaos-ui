"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component MobilePullRefresh
 * @category UI
 * @since 1.0.0-beta.0
 * @description 下拉刷新容器，触摸下拉超过阈值触发 onRefresh
 * @example
 * ```tsx
 * <MobilePullRefresh refreshing={loading} onRefresh={refetch} threshold={60}>
 *   <List />
 * </MobilePullRefresh>
 * ```
 */
export interface MobilePullRefreshProps {
  /** 刷新回调 / refresh handler */
  onRefresh?: () => Promise<void> | void;
  /** 是否正在刷新 / refreshing state */
  refreshing?: boolean;
  /** 子内容 / children */
  children?: React.ReactNode;
  /** 触发阈值(px) / pull threshold in px */
  threshold?: number;
  /** 附加类名 / extra class */
  className?: string;
}

function MobilePullRefresh({
  onRefresh,
  refreshing = false,
  children,
  threshold = 60,
  className,
}: MobilePullRefreshProps) {
  const [pullDistance, setPullDistance] = React.useState(0);
  const startYRef = React.useRef<number | null>(null);
  const pullingRef = React.useRef(false);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (refreshing) return;
    startYRef.current = event.touches[0]?.clientY ?? null;
    pullingRef.current = true;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!pullingRef.current || startYRef.current === null || refreshing) return;
    const currentY = event.touches[0]?.clientY ?? 0;
    const delta = currentY - startYRef.current;
    if (delta > 0) {
      setPullDistance(delta);
    }
  };

  const handleTouchEnd = () => {
    pullingRef.current = false;
    if (pullDistance >= threshold && !refreshing) {
      onRefresh?.();
    }
    setPullDistance(0);
    startYRef.current = null;
  };

  const showIndicator = refreshing || pullDistance > 0;
  const indicatorOffset = refreshing ? threshold : pullDistance;

  return (
    <div
      data-slot="mobile-pull-refresh"
      className={cn("relative overflow-hidden touch-none", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        data-slot="mobile-pull-refresh-indicator"
        aria-hidden={showIndicator ? "false" : "true"}
        className="flex items-center justify-center text-xs text-muted-foreground transition-opacity"
        style={{ height: `${indicatorOffset}px`, opacity: showIndicator ? 1 : 0 }}
      >
        {refreshing ? (
          <span data-slot="mobile-pull-refresh-spinner" className="animate-spin">
            ⟳
          </span>
        ) : (
          <span>{pullDistance >= threshold ? "释放刷新" : "下拉刷新"}</span>
        )}
      </div>
      <div
        data-slot="mobile-pull-refresh-content"
        style={{ transform: `translateY(${refreshing ? threshold : 0}px)` }}
      >
        {children}
      </div>
    </div>
  );
}

export { MobilePullRefresh };
