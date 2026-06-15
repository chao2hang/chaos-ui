"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

interface LegendPayloadEntry {
  value?: string
  color?: string
}

interface ChartLegendProps {
  payload?: LegendPayloadEntry[]
  className?: string
}

export function ChartLegend({ payload, className }: ChartLegendProps) {
  if (!payload?.length) return null
  return (
    <ul
      data-slot="chart-legend"
      className={cn("flex flex-wrap items-center justify-center gap-3 text-xs", className)}
    >
      {payload.map((entry: LegendPayloadEntry, i: number) => (
        <li key={i} className="flex items-center gap-1.5">
          <span
            className="size-2.5 shrink-0 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.value}</span>
        </li>
      ))}
    </ul>
  )
}
