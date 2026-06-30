"use client";
import { cn } from "@/lib/utils";

/**
 * @component BarChart
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <BarChart />
 * ```
 * 柱状图(分组/堆叠/横向)
 */
export interface BarChartProps {
  className?: string;
}

function BarChart({ className }: BarChartProps) {
  return <div data-slot="bar-chart" className={cn("", className)} />;
}

export { BarChart };
