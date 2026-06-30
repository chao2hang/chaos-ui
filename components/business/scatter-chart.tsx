"use client";
import { cn } from "@/lib/utils";

/**
 * @component ScatterChart
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <ScatterChart />
 * ```
 * 散点图
 */
export interface ScatterChartProps {
  className?: string;
}

function ScatterChart({ className }: ScatterChartProps) {
  return <div data-slot="scatter-chart" className={cn("", className)} />;
}

export { ScatterChart };
