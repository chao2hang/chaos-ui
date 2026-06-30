"use client";
import { cn } from "@/lib/utils";

/**
 * @component StatCardWithDelta
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <StatCardWithDelta />
 * ```
 * 统计卡 + 增减标签
 */
export interface StatCardWithDeltaProps {
  className?: string;
}

function StatCardWithDelta({ className }: StatCardWithDeltaProps) {
  return <div data-slot="stat-card-with-delta" className={cn("", className)} />;
}

export { StatCardWithDelta };
