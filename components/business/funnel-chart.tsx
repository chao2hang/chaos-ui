"use client";

import { cn } from "@/lib/utils";

/**
 * @component FunnelChart
 * @category business/charts
 * @since 0.7.0
 * @description 漏斗图
 * @keywords funnel, chart
 * @example
 * <FunnelChart />
 */

interface FunnelChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  height?: number;
  className?: string;
}

function FunnelChart({ className }: FunnelChartProps) {
  return (
    <div data-slot="funnel-chart" className={cn("", className)}>
      {null}
    </div>
  );
}

export { FunnelChart };
export type { FunnelChartProps };
