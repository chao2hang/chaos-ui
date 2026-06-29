"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipPayloadEntry {
  dataKey?: string
  name?: string
  value?: number
  color?: string
}

interface ChartTooltipProps {
  active?: boolean
  payload?: TooltipPayloadEntry[]
  label?: unknown
  className?: string
}

export function ChartTooltip({ active, payload, label, className }: ChartTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div
      data-slot="chart-tooltip"
      className={cn("rounded-md border bg-popover px-2.5 py-1.5 text-xs shadow-md", className)}
    >
      {label != null && <div className="mb-1 text-muted-foreground">{String(label)}</div>}
      <div className="space-y-0.5">
        {payload.map((entry: TooltipPayloadEntry, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="font-medium">{entry.name ?? entry.dataKey}</span>
            <span className="ml-auto tabular-nums text-muted-foreground">
              {entry.value?.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
