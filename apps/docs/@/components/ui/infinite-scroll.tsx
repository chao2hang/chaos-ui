"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

/**
 * @component InfiniteScroll
 * @category ui/primitives
 * @since 0.8.0
 * @description Scroll-based load-more wrapper using IntersectionObserver. Detects when a sentinel enters the viewport and triggers onLoadMore. / 基于 IntersectionObserver 的滚动加载更多包装器，检测哨兵元素进入视口时触发加载。
 * @keywords infinite, scroll, load-more, intersection-observer, pagination
 * @example
 * <InfiniteScroll onLoadMore={fetchPage} hasMore={hasMore} loading={loading}>
 *   {items.map(item => <Card key={item.id}>{item.name}</Card>)}
 * </InfiniteScroll>
 */

interface InfiniteScrollProps extends React.ComponentProps<"div"> {
  /** Called when the sentinel enters the viewport and more data is available / 哨兵进入视口且有更多数据时调用 */
  onLoadMore?: () => void;
  /** Whether more data exists / 是否还有更多数据 */
  hasMore?: boolean;
  /** Whether currently loading / 是否正在加载 */
  loading?: boolean;
  /** Custom loading indicator / 自定义加载指示器 */
  loader?: React.ReactNode;
  /** Distance from viewport bottom to trigger (CSS margin string, default "200px") / 触发距离 */
  threshold?: string;
  /** Custom scroll container element / 自定义滚动容器 */
  scrollContainer?: HTMLElement | null;
  /** Text shown when no more data / 无更多数据时显示的文本 */
  endMessage?: React.ReactNode;
}

export function InfiniteScroll({
  onLoadMore,
  hasMore = true,
  loading = false,
  loader,
  threshold = "200px",
  scrollContainer,
  endMessage = "No more data",
  className,
  children,
  ...props
}: InfiniteScrollProps) {
  const sentinelRef = React.useRef<HTMLDivElement>(null);
  const onLoadMoreRef = React.useRef(onLoadMore);
  onLoadMoreRef.current = onLoadMore;
  const loadingRef = React.useRef(loading);
  loadingRef.current = loading;
  const hasMoreRef = React.useRef(hasMore);
  hasMoreRef.current = hasMore;

  React.useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0]?.isIntersecting &&
          !loadingRef.current &&
          hasMoreRef.current
        ) {
          onLoadMoreRef.current?.();
        }
      },
      { root: scrollContainer ?? null, rootMargin: `${threshold} 0px` },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [threshold, scrollContainer]);

  return (
    <div
      data-slot="infinite-scroll"
      className={cn("flex flex-col", className)}
      {...props}
    >
      {children}
      <div
        ref={sentinelRef}
        className="flex items-center justify-center py-4"
        aria-live="polite"
      >
        {loading ? (
          (loader ?? <Spinner size="sm" />)
        ) : !hasMore ? (
          <span className="text-muted-foreground text-xs">{endMessage}</span>
        ) : null}
      </div>
    </div>
  );
}

export type { InfiniteScrollProps };
