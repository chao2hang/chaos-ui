"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChartSuite
 * @category business/charts
 * @since 0.7.0
 * @description 图表套件
 * @keywords chart, suite
 * @example
 * <ChartSuite />
 */

interface ChartSuiteProps {
  type: "line" | "bar" | "pie" | "radar" | "scatter";
  data: unknown[];
  xField?: string;
  yField?: string;
  series?: string;
  height?: number;
  className?: string;
}

function ChartSuite({ className }: ChartSuiteProps) {
  return (
    <div data-slot="chart-suite" className={cn("", className)}>
      {null}
    </div>
  );
}

export { ChartSuite };
export type { ChartSuiteProps };
