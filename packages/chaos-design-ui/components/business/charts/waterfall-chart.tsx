"use client"
import * as React from "react"
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts"
import { ChartTooltip } from "./shared/chart-tooltip"
import { ChartLegend } from "./shared/chart-legend"
import { ChartFrame } from "./chart-frame"
import { type BaseChartProps, type DataRecord } from "./types"

export function WaterfallChart({
  data,
  xKey = "name",
  yKey = "value",
  height = 320,
  loading,
  empty,
  enableExport,
  enableFullscreen,
  className,
}: BaseChartProps) {
  const computed = React.useMemo(() => {
    return data.reduce<Array<DataRecord & {
      _start: number
      _value: number
      _isTotal: boolean
      _isPositive: boolean
      _cumulativeAfter: number
    }>>((acc, d) => {
      const cumulative = acc.length > 0 ? acc[acc.length - 1]._cumulativeAfter : 0
      const value = Number(d[yKey])
      const isTotal = d.isTotal === true
      const start = isTotal ? 0 : cumulative
      const end = isTotal ? value : cumulative + value
      acc.push({
        ...d,
        _start: Math.min(start, end),
        _value: Math.abs(end - start),
        _isTotal: isTotal,
        _isPositive: end >= start,
        _cumulativeAfter: end,
      })
      return acc
    }, [])
  }, [data, yKey])

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
      <div className="flex flex-col">
        <ResponsiveContainer width="100%" height={height ?? 320}>
          <RechartsBarChart data={computed} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey={xKey} stroke="var(--muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--muted-foreground)" fontSize={12} />
            <Tooltip content={<ChartTooltip />} />
            {computed.slice(0, -1).map((entry, i) => {
              const next = computed[i + 1]
              return (
                <ReferenceLine
                  key={`connector-${i}`}
                  segment={[
                    { x: String(entry[xKey]), y: entry._cumulativeAfter },
                    { x: String(next[xKey]), y: entry._cumulativeAfter },
                  ]}
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                  ifOverflow="extendDomain"
                />
              )
            })}
            <Bar dataKey="_start" stackId="waterfall" fill="transparent" />
            <Bar dataKey="_value" stackId="waterfall" radius={[4, 4, 0, 0]}>
              {computed.map((entry, i) => (
                <Cell key={i} fill={entry._isTotal ? "var(--chart-2)" : entry._isPositive ? "var(--chart-1)" : "var(--destructive)"} />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
        <ChartLegend
          className="mt-2"
          payload={[
            { value: "总计", color: "var(--chart-2)" },
            { value: "正向", color: "var(--chart-1)" },
            { value: "负向", color: "var(--destructive)" },
          ]}
        />
      </div>
    </ChartFrame>
  )
}
