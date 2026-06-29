"use client"
import * as React from "react"
import {
  ResponsiveContainer,
  RadialBarChart as RechartsRadialBarChart,
  RadialBar,
  Cell,
  Tooltip,
  Legend,
} from "recharts"
import { ChartTooltip } from "./shared/chart-tooltip"
import { ChartLegend } from "./shared/chart-legend"
import { ChartFrame } from "./chart-frame"
import { PALETTE, type BaseChartProps } from "./types"

export function RadialChartComp({
  data,
  yKey = "value",
  height,
  loading,
  empty,
  showLegend = true,
  showTooltip = true,
  enableExport,
  enableFullscreen,
  className,
}: BaseChartProps) {
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
        <RechartsRadialBarChart
          data={data}
          innerRadius="20%"
          outerRadius="100%"
          startAngle={90}
          endAngle={-270}
        >
          {showTooltip && <Tooltip content={<ChartTooltip />} />}
          {showLegend && <Legend content={<ChartLegend />} />}
          <RadialBar dataKey={yKey} background>
            {data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </RadialBar>
        </RechartsRadialBarChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}
