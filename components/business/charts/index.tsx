"use client"
import * as React from "react"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadarChart as RechartsRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBarChart as RechartsRadialBarChart,
  RadialBar,
  ScatterChart as RechartsScatterChart,
  Scatter,
  ComposedChart as RechartsComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  type TooltipProps,
} from "recharts"
import { cn } from "@/lib/utils"
import { useChartData } from "@/hooks/use-chart-data"
import { ChartTooltip } from "./shared/chart-tooltip"
import { ChartLegend } from "./shared/chart-legend"
import { ChartSkeleton } from "./shared/chart-skeleton"
import { ChartEmpty } from "./shared/chart-empty"
import { ChartExportButton } from "./shared/chart-export"
import { ChartFullscreenButton } from "./shared/chart-fullscreen"
import ReactECharts from "echarts-for-react"
import { buildSankeyOption } from "./sankey"

const PALETTE = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const

type DataRecord = Record<string, unknown>

interface BaseChartProps extends React.ComponentProps<"div"> {
  data: DataRecord[]
  height?: number
  loading?: boolean
  empty?: boolean
  xKey?: string
  yKey?: string
  series?: Array<{ key: string; color?: string; name?: string }>
  showLegend?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  enableExport?: boolean
  enableFullscreen?: boolean
  className?: string
}

export const chartColors = PALETTE

function LineChart({
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
  ...props
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

function AreaChart({
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
        <RechartsComposedChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
          <defs>
            {keys.map((key, i) => (
              <linearGradient key={key} id={`area-fill-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={series?.[i]?.color ?? PALETTE[i % PALETTE.length]} stopOpacity={0.3} />
                <stop offset="100%" stopColor={series?.[i]?.color ?? PALETTE[i % PALETTE.length]} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />}
          <XAxis dataKey={xKey} stroke="var(--muted-foreground)" fontSize={12} />
          <YAxis stroke="var(--muted-foreground)" fontSize={12} />
          {showTooltip && <Tooltip content={<ChartTooltip />} />}
          {showLegend && <Legend content={<ChartLegend />} />}
          {keys.map((key, i) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={series?.[i]?.color ?? PALETTE[i % PALETTE.length]}
              fill={`url(#area-fill-${key})`}
              name={series?.[i]?.name ?? key}
            />
          ))}
        </RechartsComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

function BarChart({
  data,
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
        <RechartsBarChart
          data={data}
          layout={layout === "vertical" ? "vertical" : "horizontal"}
          margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />}
          {layout === "vertical" ? (
            <>
              <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis type="category" dataKey={xKey} stroke="var(--muted-foreground)" fontSize={12} width={80} />
            </>
          ) : (
            <>
              <XAxis dataKey={xKey} stroke="var(--muted-foreground)" fontSize={12} />
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
  )
}

function PieChartComp({
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

function RadarChartComp({
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

function RadialChartComp({
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

function ScatterChartComp({
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
        <RechartsScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />}
          <XAxis dataKey={xKey} stroke="var(--muted-foreground)" fontSize={12} />
          <YAxis dataKey={yKey} stroke="var(--muted-foreground)" fontSize={12} />
          {showTooltip && <Tooltip content={<ChartTooltip />} cursor={{ strokeDasharray: "3 3" }} />}
          {showLegend && <Legend content={<ChartLegend />} />}
          {keys.map((key, i) => (
            <Scatter
              key={key}
              name={series?.[i]?.name ?? key}
              data={data as Array<Record<string, number>>}
              fill={series?.[i]?.color ?? PALETTE[i % PALETTE.length]}
            />
          ))}
        </RechartsScatterChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

function ComposedChartComp({
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

function FunnelChart({
  data,
  xKey = "name",
  yKey = "value",
  height,
  loading,
  empty,
  enableExport,
  enableFullscreen,
  className,
}: BaseChartProps) {
  const sorted = React.useMemo(() => [...data].sort((a, b) => Number(b[yKey]) - Number(a[yKey])), [data, yKey])
  const max = Math.max(...sorted.map((d) => Number(d[yKey])), 1)
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
      <div className="flex w-full flex-col gap-1" style={{ height: height ?? 320 }}>
        {sorted.map((row, i) => {
          const value = Number(row[yKey])
          const width = (value / max) * 100
          return (
            <div key={String(row[xKey])} className="flex items-center gap-3">
              <div className="w-24 truncate text-sm text-muted-foreground">{String(row[xKey])}</div>
              <div className="relative h-9 flex-1 overflow-hidden rounded">
                <div
                  className="h-full transition-all"
                  style={{ width: `${width}%`, backgroundColor: PALETTE[i % PALETTE.length] }}
                />
              </div>
              <div className="w-16 text-right text-sm tabular-nums">{value.toLocaleString()}</div>
            </div>
          )
        })}
      </div>
    </ChartFrame>
  )
}

function HeatmapChart({
  data,
  xKey = "x",
  yKey = "y",
  valueKey = "value",
  height = 320,
  loading,
  empty,
  enableExport,
  enableFullscreen,
  className,
}: BaseChartProps & { valueKey?: string }) {
  const matrix = React.useMemo(() => {
    const xSet = new Set<string>()
    const ySet = new Set<string>()
    data.forEach((d) => {
      xSet.add(String(d[xKey]))
      ySet.add(String(d[yKey]))
    })
    const xs = Array.from(xSet)
    const ys = Array.from(ySet)
    const lookup = new Map<string, number>()
    data.forEach((d) => {
      const v = Number(d[valueKey])
      lookup.set(`${d[xKey]}|${d[yKey]}`, v)
    })
    return { xs, ys, lookup }
  }, [data, xKey, yKey, valueKey])

  const max = Math.max(...data.map((d) => Number(d[valueKey])), 1)
  const min = Math.min(...data.map((d) => Number(d[valueKey])), 0)
  const get = (x: string, y: string) => {
    const v = matrix.lookup.get(`${x}|${y}`) ?? 0
    if (max === min) return 0
    return (v - min) / (max - min)
  }

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
      <div className="overflow-auto" style={{ height }}>
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 bg-background p-1"></th>
              {matrix.xs.map((x) => (
                <th key={x} className="p-1 text-xs text-muted-foreground">{x}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.ys.map((y) => (
              <tr key={y}>
                <th className="sticky left-0 bg-background p-1 text-left text-xs text-muted-foreground">{y}</th>
                {matrix.xs.map((x) => {
                  const intensity = get(x, y)
                  return (
                    <td
                      key={`${x}-${y}`}
                      className="p-1"
                      title={`${x}, ${y}: ${matrix.lookup.get(`${x}|${y}`) ?? 0}`}
                    >
                      <div
                        className="aspect-square w-full rounded"
                        style={{ backgroundColor: `rgba(99, 102, 241, ${intensity})` }}
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartFrame>
  )
}

function SankeyChart({
  data,
  xKey = "source",
  yKey = "target",
  valueKey = "value",
  height = 320,
  loading,
  empty,
  enableExport,
  enableFullscreen,
  className,
}: BaseChartProps & { valueKey?: string }) {
  const option = React.useMemo(
    () => buildSankeyOption(data, xKey, yKey, valueKey, [...PALETTE], height),
    [data, xKey, yKey, valueKey, height],
  )

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
      <ReactECharts
        option={option}
        notMerge
        lazyUpdate
        autoResize
        style={{ height, width: "100%" }}
        opts={{ renderer: "svg" }}
      />
    </ChartFrame>
  )
}

function TreemapChart({
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
  const total = data.reduce((sum, d) => sum + Number(d[yKey]), 0)
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
      <div className="flex w-full overflow-hidden rounded" style={{ height }}>
        {data.map((d, i) => {
          const value = Number(d[yKey])
          const width = (value / total) * 100
          return (
            <div
              key={String(d[xKey])}
              className="flex flex-col items-center justify-center p-2 text-xs font-medium text-white transition-all"
              style={{ width: `${width}%`, backgroundColor: PALETTE[i % PALETTE.length] }}
              title={`${d[xKey]}: ${value}`}
            >
              <div className="truncate">{String(d[xKey])}</div>
              <div className="opacity-80">{value.toLocaleString()}</div>
            </div>
          )
        })}
      </div>
    </ChartFrame>
  )
}

function WaterfallChart({
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

function ChartFrame({
  data,
  loading,
  empty,
  height,
  enableExport,
  enableFullscreen,
  className,
  children,
}: {
  data: unknown[]
  loading?: boolean
  empty?: boolean
  height?: number
  enableExport?: boolean
  enableFullscreen?: boolean
  className?: string
  children: React.ReactNode
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  if (loading) return <ChartSkeleton height={height} className={className} />
  if (empty || data.length === 0) return <ChartEmpty height={height} className={className} />
  return (
    <div ref={ref} className={cn("relative", className)}>
      {(enableExport || enableFullscreen) && (
        <div className="absolute top-2 right-2 z-10 flex gap-1">
          {enableExport && <ChartExportButton target={ref} />}
          {enableFullscreen && <ChartFullscreenButton target={ref} />}
        </div>
      )}
      {children}
    </div>
  )
}

export {
  LineChart,
  AreaChart,
  BarChart,
  PieChartComp as PieChart,
  RadarChartComp as RadarChart,
  RadialChartComp as RadialChart,
  ScatterChartComp as ScatterChart,
  ComposedChartComp as ComposedChart,
  FunnelChart,
  HeatmapChart,
  SankeyChart,
  TreemapChart,
  WaterfallChart,
}
export type { BaseChartProps }
export { useChartData } from "@/hooks/use-chart-data"
export { ChartTooltip, ChartLegend, ChartSkeleton, ChartEmpty, ChartExportButton, ChartFullscreenButton }
