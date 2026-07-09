"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui"

interface StatCardRowProps {
  cards: {
    title: string
    value: React.ReactNode
    description?: string
    icon?: React.ReactNode
    color?: string
    trend?: {
      value: number
      /** "up" = positive/green, "down" = negative/red */
      direction?: "up" | "down"
    }
    sparkline?: React.ReactNode
    onClick?: () => void
  }[]
  /** Responsive columns */
  columns?: { xs?: number; sm?: number; md?: number; lg?: number }
  className?: string
}

/**
 * 统计卡横排布局 —— 对标 qxy-mop dashboard 的指标卡行。
 * 支持响应式列数、趋势箭头、迷你图。
 *
 * @component StatCardRow
 * @category business/dashboard
 * @since 0.2.0
 */
function StatCardRow({ cards, columns, className }: StatCardRowProps) {
  const colClasses = [
    columns?.xs ? `grid-cols-${columns.xs}` : "grid-cols-1",
    columns?.sm ? `sm:grid-cols-${columns.sm}` : "",
    columns?.md ? `md:grid-cols-${columns.md}` : "md:grid-cols-2",
    columns?.lg ? `lg:grid-cols-${columns.lg}` : "lg:grid-cols-4",
  ]
    .filter(Boolean)
    .join(" ")

  const trendColor = (direction?: "up" | "down") => {
    if (!direction) return "text-muted-foreground"
    // Chinese convention: 涨红跌绿
    return direction === "up" ? "text-red-500" : "text-green-500"
  }

  return (
    <div data-slot="stat-card-row" className={cn("grid gap-4", colClasses, className)}>
      {cards.map((card, index) => (
        <Card
          key={index}
          className={cn(card.onClick && "cursor-pointer hover:shadow-md transition-shadow")}
          onClick={card.onClick}
        >
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-muted-foreground truncate">
                  {card.title}
                </p>
                <p className="mt-2 text-2xl font-bold tabular-nums">
                  {card.value}
                </p>
                {card.description && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {card.description}
                  </p>
                )}
                {card.trend && (
                  <p className={cn("mt-2 text-sm font-medium", trendColor(card.trend.direction))}>
                    {card.trend.direction === "down" ? "↓" : "↑"}{" "}
                    {Math.abs(card.trend.value).toFixed(1)}%
                  </p>
                )}
                {card.sparkline && (
                  <div className="mt-2">{card.sparkline}</div>
                )}
              </div>
              {card.icon && (
                <div
                  className="flex size-10 items-center justify-center rounded-lg shrink-0"
                  style={{ backgroundColor: card.color ? `${card.color}15` : undefined }}
                >
                  {card.icon}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export { StatCardRow }
export type { StatCardRowProps }
