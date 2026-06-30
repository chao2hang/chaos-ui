"use client";
import { cn } from "@/lib/utils";

/**
 * @component RadialChart
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <RadialChart />
 * ```
 * 径向图(达成率)
 */
export interface RadialChartProps {
  className?: string;
}

function RadialChart({ className }: RadialChartProps) {
  return <div data-slot="radial-chart" className={cn("", className)} />;
}

export { RadialChart };
