"use client";
import { cn } from "@/lib/utils";

/**
 * @component SankeyChart
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <SankeyChart />
 * ```
 * 桑基图(流量流转)
 */
export interface SankeyChartProps {
  className?: string;
}

function SankeyChart({ className }: SankeyChartProps) {
  return <div data-slot="sankey-chart" className={cn("", className)} />;
}

export { SankeyChart };
