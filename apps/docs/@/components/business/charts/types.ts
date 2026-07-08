"use client";
import * as React from "react";

export const PALETTE = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

export const chartColors = PALETTE;

export type DataRecord = Record<string, unknown>;

export interface BaseChartProps extends React.ComponentProps<"div"> {
  data?: DataRecord[];
  height?: number;
  loading?: boolean;
  empty?: boolean;
  xKey?: string;
  yKey?: string;
  series?: Array<{ key: string; color?: string; name?: string }>;
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  enableExport?: boolean;
  enableFullscreen?: boolean;
  className?: string;
}
