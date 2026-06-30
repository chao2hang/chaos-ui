"use client";
import { cn } from "@/lib/utils";

/**
 * @component RadarChart
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <RadarChart />
 * ```
 * 雷达图(多维评估)
 */
export interface RadarChartProps {
  className?: string;
}

function RadarChart({ className }: RadarChartProps) {
  return <div data-slot="radar-chart" className={cn("", className)} />;
}

export { RadarChart };
