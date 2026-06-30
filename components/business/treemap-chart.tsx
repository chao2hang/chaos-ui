"use client";
import { cn } from "@/lib/utils";

/**
 * @component TreemapChart
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <TreemapChart />
 * ```
 * 树图(层级占比)
 */
export interface TreemapChartProps {
  className?: string;
}

function TreemapChart({ className }: TreemapChartProps) {
  return <div data-slot="treemap-chart" className={cn("", className)} />;
}

export { TreemapChart };
