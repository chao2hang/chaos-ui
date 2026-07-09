"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Loader2Icon } from "@/components/ui/icons";

/**
 * @component MobileInfiniteScroll
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端无限滚动 — 监听滚动到底部触发加载更多，支持加载中与无更多数据状态。
 * @keywords mobile, infinite, scroll
 * @param onLoadMore 滚动触底且仍有更多数据时触发。
 * @param hasMore 是否还有更多数据；为 false 时显示“没有更多了”。
 * @param loading 是否正在加载；为 true 时显示加载指示器并阻止重复触发。
 * @param children 列表内容。
 * @example
 * <MobileInfiniteScroll onLoadMore={fetch} hasMore={page<total} loading={loading}>
 *   {items.map(...)}
 * </MobileInfiniteScroll>
 */

interface MobileInfiniteScrollProps {
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

function MobileInfiniteScroll({
  onLoadMore,
  hasMore = true,
  loading = false,
  children,
  className,
}: MobileInfiniteScrollProps) {
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    if (!hasMore || loading) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !loading && hasMore) {
            onLoadMore?.();
          }
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);

  return (
    <div
      data-slot="mobile-infinite-scroll"
      className={cn("flex flex-col", className)}
    >
      {children}
      <div
        ref={sentinelRef}
        className="flex items-center justify-center gap-2 py-3 text-xs text-muted-foreground"
        aria-live="polite"
      >
        {loading ? (
          <>
            <Loader2Icon className="size-3.5 animate-spin" aria-hidden="true" />
            <span>加载中…</span>
          </>
        ) : hasMore ? (
          <span>上拉加载更多</span>
        ) : (
          <span>没有更多了</span>
        )}
      </div>
    </div>
  );
}

export { MobileInfiniteScroll };
export type { MobileInfiniteScrollProps };
