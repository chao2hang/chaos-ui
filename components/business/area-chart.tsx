"use client";
import { cn } from "@/lib/utils";

/**
 * @component AreaChart
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <AreaChart />
 * ```
 * 面积图(趋势+填充)
 */
export interface AreaChartProps {
  className?: string;
}

function AreaChart({ className }: AreaChartProps) {
  return <div data-slot="area-chart" className={cn("", className)} />;
}

export { AreaChart };
