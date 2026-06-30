"use client";
import { cn } from "@/lib/utils";

/**
 * @component GaugeChart
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <GaugeChart />
 * ```
 * 仪表盘图
 */
export interface GaugeChartProps {
  className?: string;
}

function GaugeChart({ className }: GaugeChartProps) {
  return <div data-slot="gauge-chart" className={cn("", className)} />;
}

export { GaugeChart };
