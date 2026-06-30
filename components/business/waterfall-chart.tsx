"use client";
import { cn } from "@/lib/utils";

/**
 * @component WaterfallChart
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <WaterfallChart />
 * ```
 * 瀑布图(财务分析)
 */
export interface WaterfallChartProps {
  className?: string;
}

function WaterfallChart({ className }: WaterfallChartProps) {
  return <div data-slot="waterfall-chart" className={cn("", className)} />;
}

export { WaterfallChart };
