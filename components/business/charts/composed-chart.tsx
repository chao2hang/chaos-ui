"use client"
import * as React from "react"
import {
  ResponsiveContainer,
  ComposedChart as RechartsComposedChart,
  Line,
  Bar,
  Area,
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

export function ComposedChartComp({
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
  const items = series ?? [{ key: yKey, name: yKey }]
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
        <RechartsComposedChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />}
          <XAxis dataKey={xKey} stroke="var(--muted-foreground)" fontSize={12} />
          <YAxis stroke="var(--muted-foreground)" fontSize={12} />
          {showTooltip && <Tooltip content={<ChartTooltip />} />}
          {showLegend && <Legend content={<ChartLegend />} />}
          {items.map((s, i) => {
            const color = s.color ?? PALETTE[i % PALETTE.length]
            const k = s.key
            if (k === "bar") return <Bar key={k} dataKey={k} fill={color} name={s.name ?? k} />
            if (k === "area") return <Area key={k} type="monotone" dataKey={k} fill={color} stroke={color} name={s.name ?? k} />
            return <Line key={k} type="monotone" dataKey={k} stroke={color} dot={false} name={s.name ?? k} />
          })}
        </RechartsComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}
