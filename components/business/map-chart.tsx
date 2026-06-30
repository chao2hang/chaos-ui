"use client";

import { cn } from "@/lib/utils";

/**
 * @component MapChart
 * @category business/charts
 * @since 0.7.0
 * @description 地图
 * @keywords map, chart
 * @example
 * <MapChart />
 */

interface MapChartProps {
  region: string;
  data: Array<{ name: string; value: number }>;
  className?: string;
}

function MapChart({ className }: MapChartProps) {
  return (
    <div data-slot="map-chart" className={cn("", className)}>
      {null}
    </div>
  );
}

export { MapChart };
export type { MapChartProps };
