"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@chaos_team/chaos-ui/ui"
import { cn } from "@chaos_team/chaos-ui/lib"
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react"

interface MobileKPICardProps {
  title: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon?: React.ElementType
  className?: string
}

function MobileKPICard({ title, value, change, changeType = "neutral", icon: Icon, className }: MobileKPICardProps) {
  const trendIcons = {
    positive: ArrowUpIcon,
    negative: ArrowDownIcon,
    neutral: MinusIcon,
  }
  const trendColors = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  }
  const TrendIcon = trendIcons[changeType]

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon && <Icon className="size-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className={cn("flex items-center gap-1 mt-1 text-xs", trendColors[changeType])}>
            <TrendIcon className="size-3" />
            <span className="font-medium">{change}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { MobileKPICard }
export type { MobileKPICardProps }
