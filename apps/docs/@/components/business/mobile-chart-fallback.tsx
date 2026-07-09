"use client"
import * as React from "react"
import { BarChart3Icon } from "lucide-react"
import { cn } from "@chaos_team/chaos-ui/lib"

export function MobileChartFallback({ label = "图表", className }: { label?: string; className?: string }) {
  return (
    <div
      data-slot="mobile-chart-fallback"
      className={cn(
        "flex h-32 w-full flex-col items-center justify-center gap-2 rounded-md border bg-muted/20 text-muted-foreground",
        className
      )}
    >
      <BarChart3Icon className="size-6" />
      <span className="text-xs">{label}</span>
      <span className="text-[0.65rem]">横屏查看或使用桌面版</span>
    </div>
  )
}
