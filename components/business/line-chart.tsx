"use client";
import { cn } from "@/lib/utils";

/**
 * @component LineChart
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <LineChart />
 * ```
 * 折线图(多线+标注)
 */
export interface LineChartProps {
  className?: string;
}

function LineChart({ className }: LineChartProps) {
  return <div data-slot="line-chart" className={cn("", className)} />;
}

export { LineChart };
