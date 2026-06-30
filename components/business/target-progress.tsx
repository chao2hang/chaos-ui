"use client";

import { cn } from "@/lib/utils";

/**
 * @component TargetProgress
 * @category business/finance
 * @since 0.7.0
 * @description 目标进度
 * @keywords target, progress
 * @example
 * <TargetProgress />
 */

interface TargetProgressProps {
  target: number;
  actual: number;
  period?: string;
  className?: string;
}

function TargetProgress({ className }: TargetProgressProps) {
  return (
    <div data-slot="target-progress" className={cn("", className)}>
      {null}
    </div>
  );
}

export { TargetProgress };
export type { TargetProgressProps };
