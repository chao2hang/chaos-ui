"use client"
import * as React from "react"
import {
  ResponsiveContainer,
  RadarChart as RechartsRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
} from "recharts"
import { ChartTooltip } from "./shared/chart-tooltip"
import { ChartLegend } from "./shared/chart-legend"
import { ChartFrame } from "./chart-frame"
import { PALETTE, type BaseChartProps } from "./types"

export function RadarChartComp({
  data,
  xKey = "subject",
  yKey = "value",
  series,
  height,
  loading,
  empty,
  showLegend = true,
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
        <RechartsRadarChart data={data}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey={xKey} stroke="var(--muted-foreground)" fontSize={12} />
          <PolarRadiusAxis stroke="var(--muted-foreground)" fontSize={10} />
          {showTooltip && <Tooltip content={<ChartTooltip />} />}
          {showLegend && <Legend content={<ChartLegend />} />}
          {keys.map((key, i) => (
            <Radar
              key={key}
              dataKey={key}
              stroke={series?.[i]?.color ?? PALETTE[i % PALETTE.length]}
              fill={series?.[i]?.color ?? PALETTE[i % PALETTE.length]}
              fillOpacity={0.3}
              name={series?.[i]?.name ?? key}
            />
          ))}
        </RechartsRadarChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}
