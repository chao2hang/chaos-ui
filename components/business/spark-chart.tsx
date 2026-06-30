"use client";
import { cn } from "@/lib/utils";

/**
 * @component SparkChart
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <SparkChart />
 * ```
 * 迷你趋势图
 */
export interface SparkChartProps {
  className?: string;
}

function SparkChart({ className }: SparkChartProps) {
  return <div data-slot="spark-chart" className={cn("", className)} />;
}

export { SparkChart };
