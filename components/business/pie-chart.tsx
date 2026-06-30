"use client";
import { cn } from "@/lib/utils";

/**
 * @component PieChart
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <PieChart />
 * ```
 * 饼图
 */
export interface PieChartProps {
  className?: string;
}

function PieChart({ className }: PieChartProps) {
  return <div data-slot="pie-chart" className={cn("", className)} />;
}

export { PieChart };
