import * as React from "react";

import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

interface SkeletonFormProps extends React.ComponentProps<"div"> {
  /** Number of fields / 字段数量 */
  fields?: number;
  /** Number of columns / 列数 */
  columns?: number;
  /** Show submit button skeleton / 显示提交按钮骨架 */
  showSubmit?: boolean;
}

/**
 * @component SkeletonForm
 * @category ui/feedback
 * @since 0.2.0
 * @description Skeleton placeholder for forms, mimics label + input rows with pulsing bars / 表单骨架占位符，模拟标签+输入行并带脉冲条
 * @keywords skeleton, form, loading, placeholder, 骨架屏, 表单
 * @example
 * <SkeletonForm fields={4} columns={2} showSubmit />
 */
function SkeletonForm({
  className,
  fields = 4,
  columns = 1,
  showSubmit = true,
  ...props
}: SkeletonFormProps) {
  const rows = Math.ceil(fields / columns);

  return (
    <div
      data-slot="skeleton-form"
      className={cn("w-full space-y-4", className)}
      {...props}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => {
            const fieldIndex = rowIndex * columns + colIndex;
            if (fieldIndex >= fields)
              return <div key={colIndex} className="flex-1" />;
            return (
              <div key={colIndex} className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-full" />
              </div>
            );
          })}
        </div>
      ))}
      {showSubmit && (
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-20 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      )}
    </div>
  );
}

export { SkeletonForm };
export type { SkeletonFormProps };
