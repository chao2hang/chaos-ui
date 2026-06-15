"use client"

import * as React from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { cn } from "@/lib/utils"

interface VirtualListProps<T> {
  data: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  estimateSize: number
  overscan?: number
  height: number
  width?: number | string
  className?: string
  onEndReached?: () => void
  endReachedThreshold?: number
  loading?: boolean
  loadingComponent?: React.ReactNode
  emptyComponent?: React.ReactNode
}

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
  const parentRef = React.useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan,
  })

  React.useEffect(() => {
    const scrollElement = parentRef.current
    if (!scrollElement || !onEndReached) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement
      if (scrollHeight - scrollTop - clientHeight < endReachedThreshold) {
        onEndReached()
      }
    }

    scrollElement.addEventListener("scroll", handleScroll)
    return () => scrollElement.removeEventListener("scroll", handleScroll)
  }, [onEndReached, endReachedThreshold])

  if (data.length === 0 && !loading) {
    return emptyComponent || (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        No data
      </div>
    )
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
            {renderItem(data[virtualItem.index], virtualItem.index)}
          </div>
        ))}
      </div>
      {loading && loadingComponent && (
        <div className="flex items-center justify-center p-4">
          {loadingComponent}
        </div>
      )}
    </div>
  )
}

export { VirtualList }
export type { VirtualListProps }
