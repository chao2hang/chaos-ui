"use client";
import { cn } from "@/lib/utils";

/**
 * @component DonutChart
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <DonutChart />
 * ```
 * 环形图(占比)
 */
export interface DonutChartProps {
  className?: string;
}

function DonutChart({ className }: DonutChartProps) {
  return <div data-slot="donut-chart" className={cn("", className)} />;
}

export { DonutChart };
