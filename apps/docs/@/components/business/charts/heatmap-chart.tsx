"use client"
import * as React from "react"
import { ChartFrame } from "./chart-frame"
import { type BaseChartProps } from "./types"

export function HeatmapChart({
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
