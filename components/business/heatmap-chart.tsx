"use client";

import { cn } from "@/lib/utils";

/**
 * @component HeatmapChart
 * @category business/charts
 * @since 0.7.0
 * @description 热力图
 * @keywords heatmap, chart
 * @example
 * <HeatmapChart />
 */

interface HeatmapChartProps {
  data: Array<{ x: string; y: string; value: number }>;
  className?: string;
}

function HeatmapChart({ className }: HeatmapChartProps) {
  return (
    <div data-slot="heatmap-chart" className={cn("", className)}>
      {null}
    </div>
  );
}

export { HeatmapChart };
export type { HeatmapChartProps };
