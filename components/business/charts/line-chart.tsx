"use client"
import * as React from "react"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { ChartTooltip } from "./shared/chart-tooltip"
import { ChartLegend } from "./shared/chart-legend"
import { ChartFrame } from "./chart-frame"
import { PALETTE, type BaseChartProps } from "./types"

export function LineChart({
  data,
  xKey = "x",
  yKey = "y",
  series,
  height,
  loading,
  empty,
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  enableExport,
  enableFullscreen,
  className,
}: BaseChartProps) {
  const keys = series?.map((s) => s.key) ?? [yKey]
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
        <RechartsLineChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />}
          <XAxis dataKey={xKey} stroke="var(--muted-foreground)" fontSize={12} />
          <YAxis stroke="var(--muted-foreground)" fontSize={12} />
          {showTooltip && <Tooltip content={<ChartTooltip />} />}
          {showLegend && <Legend content={<ChartLegend />} />}
          {keys.map((key, i) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={series?.[i]?.color ?? PALETTE[i % PALETTE.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              name={series?.[i]?.name ?? key}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}
