"use client";
import * as React from "react";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ChartTooltip } from "./shared/chart-tooltip";
import { ChartLegend } from "./shared/chart-legend";
import { ChartFrame } from "./chart-frame";
import { PALETTE, type BaseChartProps } from "./types";

export function BarChart({
  data = [],
  xKey = "x",
  yKey = "y",
  series,
  layout = "horizontal",
  stacked = false,
  height,
  loading,
  empty,
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  enableExport,
  enableFullscreen,
  className,
}: BaseChartProps & { layout?: "horizontal" | "vertical"; stacked?: boolean }) {
  const keys = series?.map((s) => s.key) ?? [yKey];
  return (
    <ChartFrame
      data={data}
      loading={loading}
      empty={empty}
      height={height}
      enableExport={enableExport}
      enableFullscreen={enableFullscreen}
      className={className}
    >
      <ResponsiveContainer width="100%" height={height ?? 320}>
        <RechartsBarChart
          data={data}
          layout={layout === "vertical" ? "vertical" : "horizontal"}
          margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
        >
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          )}
          {layout === "vertical" ? (
            <>
              <XAxis
                type="number"
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <YAxis
                type="category"
                dataKey={xKey}
                stroke="var(--muted-foreground)"
                fontSize={12}
                width={80}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey={xKey}
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
            </>
          )}
          {showTooltip && <Tooltip content={<ChartTooltip />} />}
          {showLegend && <Legend content={<ChartLegend />} />}
          {keys.map((key, i) => (
            <Bar
              key={key}
              dataKey={key}
              fill={series?.[i]?.color ?? PALETTE[i % PALETTE.length]}
              stackId={stacked ? "a" : undefined}
              radius={[4, 4, 0, 0]}
              name={series?.[i]?.name ?? key}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
