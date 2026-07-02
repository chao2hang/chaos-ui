"use client";

import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "@/lib/utils";

interface VirtualListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  estimateSize: number;
  overscan?: number;
  height: number;
  width?: number | string;
  className?: string;
  onEndReached?: () => void;
  endReachedThreshold?: number;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
}

/**
 * @component VirtualList
 * @category ui/layout
 * @since 0.2.0
 * @description High-performance virtualized list using TanStack Virtual for rendering large datasets / 基于 TanStack Virtual 的高性能虚拟列表，用于渲染大数据集
 * @keywords virtual, list, scroll, performance, lazy, 虚拟列表
 * @example
 * <VirtualList
 *   data={items}
 *   renderItem={(item, i) => <div>{item.name}</div>}
 *   estimateSize={40}
 *   height={400}
 *   onEndReached={loadMore}
 * />
 */
function VirtualList<T>({
  data,
  renderItem,
  estimateSize,
  overscan = 5,
  height,
  width = "100%",
  className,
  onEndReached,
  endReachedThreshold = 100,
  loading = false,
  loadingComponent,
  emptyComponent,
}: VirtualListProps<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  // TanStack Virtual returns imperative helpers that React Compiler cannot safely memoize.
  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan,
  });

  React.useEffect(() => {
    const scrollElement = parentRef.current;
    if (!scrollElement || !onEndReached) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      if (scrollHeight - scrollTop - clientHeight < endReachedThreshold) {
        onEndReached();
      }
    };

    scrollElement.addEventListener("scroll", handleScroll);
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [onEndReached, endReachedThreshold]);

  if (data.length === 0 && !loading) {
    return (
      emptyComponent || (
        <div className="text-muted-foreground flex items-center justify-center p-8">
          No data
        </div>
      )
    );
  }

  return (
    <div
      ref={parentRef}
      data-slot="virtual-list"
      className={cn("overflow-auto", className)}
      style={{ height, width }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            data-slot="virtual-list-item"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {renderItem(data[virtualItem.index]!, virtualItem.index)}
          </div>
        ))}
      </div>
      {loading && loadingComponent && (
        <div className="flex items-center justify-center p-4">
          {loadingComponent}
        </div>
      )}
    </div>
  );
}

export { VirtualList };
export type { VirtualListProps };
