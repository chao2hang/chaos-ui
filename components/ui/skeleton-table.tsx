import * as React from "react";

import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

interface SkeletonTableProps extends React.ComponentProps<"div"> {
  /** Number of columns / 列数 */
  columns?: number;
  /** Number of rows / 行数 */
  rows?: number;
  /** Show header skeleton / 显示表头骨架 */
  showHeader?: boolean;
  /** Show pagination skeleton / 显示分页骨架 */
  showPagination?: boolean;
}

/**
 * @component SkeletonTable
 * @category ui/feedback
 * @since 0.2.0
 * @description Skeleton placeholder for tables, mimics table structure with pulsing bars / 表格骨架占位符，模拟表格结构并带脉冲条
 * @keywords skeleton, table, loading, placeholder, 骨架屏, 表格
 * @example
 * <SkeletonTable columns={4} rows={5} />
 */
function SkeletonTable({
  className,
  columns = 5,
  rows = 5,
  showHeader = true,
  showPagination = false,
  ...props
}: SkeletonTableProps) {
  return (
    <div
      data-slot="skeleton-table"
      className={cn(
        "border-border w-full overflow-hidden rounded-lg border",
        className,
      )}
      {...props}
    >
      {showHeader && (
        <div className="border-border bg-muted/30 border-b px-3 py-2.5">
          <div className="flex gap-3">
            {Array.from({ length: columns }).map((_, i) => (
              <Skeleton key={i} className="h-4 flex-1" />
            ))}
          </div>
        </div>
      )}
      <div className="divide-border divide-y">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-3 py-2.5">
            <div className="flex gap-3">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton
                  key={colIndex}
                  className="h-4 flex-1"
                  style={{ width: `${60 + ((colIndex * 7) % 30)}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {showPagination && (
        <div className="border-border flex items-center justify-between border-t px-3 py-2.5">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="size-7 rounded-md" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { SkeletonTable };
export type { SkeletonTableProps };
