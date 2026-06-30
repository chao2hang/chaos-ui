"use client";

import { cn } from "@/lib/utils";

/**
 * @component GanttChart
 * @category business/charts
 * @since 0.7.0
 * @description 甘特图
 * @keywords gantt, chart
 * @example
 * <GanttChart />
 */

interface GanttChartProps {
  tasks: Array<{
    id: string;
    name: string;
    start: string;
    end: string;
    progress?: number;
  }>;
  className?: string;
}

function GanttChart({ className }: GanttChartProps) {
  return (
    <div data-slot="gantt-chart" className={cn("", className)}>
      {null}
    </div>
  );
}

export { GanttChart };
export type { GanttChartProps };
