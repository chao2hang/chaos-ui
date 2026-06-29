"use client"
import * as React from "react"
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts"
import { ChartTooltip } from "./shared/chart-tooltip"
import { ChartLegend } from "./shared/chart-legend"
import { ChartFrame } from "./chart-frame"
import { PALETTE, type BaseChartProps } from "./types"

export function PieChartComp({
  data,
  xKey = "name",
  yKey = "value",
  height,
  loading,
  empty,
  showLegend = true,
  showTooltip = true,
  enableExport,
  enableFullscreen,
  className,
  innerRadius,
}: BaseChartProps & { innerRadius?: number }) {
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
        <RechartsPieChart>
          {showTooltip && <Tooltip content={<ChartTooltip />} />}
          {showLegend && <Legend content={<ChartLegend />} />}
          <Pie
            data={data}
            dataKey={yKey}
            nameKey={xKey}
            innerRadius={innerRadius}
            outerRadius="70%"
            paddingAngle={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}
