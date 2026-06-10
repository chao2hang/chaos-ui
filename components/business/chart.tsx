"use client"
import * as React from "react"
import {
  ResponsiveContainer, LineChart as RLineChart, Line,
  BarChart as RBarChart, Bar, AreaChart as RAreaChart, Area,
  PieChart as RPieChart, Pie, Cell,
  Tooltip, Legend, CartesianGrid, XAxis, YAxis,
} from "recharts"
import { cn } from "@/lib/utils"

const defaultColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

function ChartContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("w-full h-[350px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

function ChartTooltip({ active, payload, label, formatter }: { active?: boolean; payload?: Array<{ color: string; name: string; value: unknown }>; label?: string; formatter?: (v: unknown) => string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border bg-popover p-2 shadow-md text-sm">
      <p className="font-medium mb-1">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="size-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-medium">{formatter ? formatter(entry.value) : String(entry.value ?? '')}</span>
        </div>
      ))}
    </div>
  )
}

function LineChart({ data, categories, index, colors = defaultColors, className }: { data: any; categories: string[]; index: string; colors?: string[]; className?: string }) {
  return (
    <ChartContainer className={className}>
      <RLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey={index} tick={{ fontSize: 12 }} className="text-muted-foreground" />
        <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
        <Tooltip content={<ChartTooltip />} />
        <Legend />
        {categories.map((cat, i) => (
          <Line key={cat} type="monotone" dataKey={cat} stroke={colors[i % colors.length]} strokeWidth={2} dot={false} />
        ))}
      </RLineChart>
    </ChartContainer>
  )
}

function BarChart({ data, categories, index, colors = defaultColors, className, stacked = false }: { data: any[]; categories: string[]; index: string; colors?: string[]; className?: string; stacked?: boolean }) {
  return (
    <ChartContainer className={className}>
      <RBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey={index} tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip content={<ChartTooltip />} />
        <Legend />
        {categories.map((cat, i) => (
          <Bar key={cat} dataKey={cat} fill={colors[i % colors.length]} radius={[4, 4, 0, 0]} stackId={stacked ? "stack" : undefined} />
        ))}
      </RBarChart>
    </ChartContainer>
  )
}

function AreaChart({ data, categories, index, colors = defaultColors, className }: { data: any[]; categories: string[]; index: string; colors?: string[]; className?: string }) {
  return (
    <ChartContainer className={className}>
      <RAreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey={index} tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip content={<ChartTooltip />} />
        <Legend />
        {categories.map((cat, i) => (
          <Area key={cat} type="monotone" dataKey={cat} fill={colors[i % colors.length]} fillOpacity={0.15} stroke={colors[i % colors.length]} strokeWidth={2} />
        ))}
      </RAreaChart>
    </ChartContainer>
  )
}

function PieChart({ data, category, index, colors = defaultColors, className }: { data: any[]; category: string; index: string; colors?: string[]; className?: string }) {
  return (
    <ChartContainer className={className}>
      <RPieChart>
        <Pie data={data} dataKey={category} nameKey={index} cx="50%" cy="50%" outerRadius={120} label>
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip />} />
        <Legend />
      </RPieChart>
    </ChartContainer>
  )
}

export { LineChart, BarChart, AreaChart, PieChart, ChartContainer, ChartTooltip }
