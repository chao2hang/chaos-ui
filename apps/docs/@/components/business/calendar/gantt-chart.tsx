"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

export interface GanttTask {
  id: string
  name: string
  start: Date
  end: Date
  progress?: number
  dependencies?: string[]
  color?: string
}

interface GanttChartProps extends React.ComponentProps<"div"> {
  tasks: GanttTask[]
  onTaskClick?: (task: GanttTask) => void
  className?: string
  locale?: string
}

export function GanttChart({ tasks, onTaskClick, className, locale = "zh-CN" }: GanttChartProps) {
  const { minDate, maxDate, totalDays } = React.useMemo(() => {
    if (tasks.length === 0) return { minDate: new Date(), maxDate: new Date(), totalDays: 1 }
    let min = tasks[0].start.getTime()
    let max = tasks[0].end.getTime()
    tasks.forEach((t) => {
      min = Math.min(min, t.start.getTime())
      max = Math.max(max, t.end.getTime())
    })
    return {
      minDate: new Date(min),
      maxDate: new Date(max),
      totalDays: Math.max(1, Math.ceil((max - min) / 86400000)),
    }
  }, [tasks])

  const dayWidth = 100 / totalDays

  return (
    <div data-slot="gantt-chart" className={cn("space-y-2", className)}>
      <div className="grid grid-cols-[200px_1fr] gap-2 text-xs">
        <div className="font-medium">任务</div>
        <div className="relative h-6 border-b">
          {Array.from({ length: Math.min(totalDays, 31) }).map((_, i) => {
            const d = new Date(minDate)
            d.setDate(d.getDate() + i)
            return (
              <div
                key={i}
                className="absolute top-0 bottom-0 border-l text-[0.65rem] text-muted-foreground"
                style={{ left: `${i * dayWidth}%`, width: `${dayWidth}%` }}
              >
                <span className="absolute top-1 left-1">{d.getDate()}</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="space-y-1">
        {tasks.map((task) => {
          const offset = ((task.start.getTime() - minDate.getTime()) / 86400000) * dayWidth
          const width = ((task.end.getTime() - task.start.getTime()) / 86400000) * dayWidth
          return (
            <div key={task.id} className="grid grid-cols-[200px_1fr] items-center gap-2">
              <div className="truncate text-sm">{task.name}</div>
              <div className="relative h-7 rounded bg-muted/30">
                <div
                  onClick={() => onTaskClick?.(task)}
                  className={cn(
                    "absolute top-1 bottom-1 cursor-pointer rounded transition-opacity hover:opacity-90",
                    !task.color && "bg-primary"
                  )}
                  style={{
                    left: `${offset}%`,
                    width: `${Math.max(width, 0.5)}%`,
                    backgroundColor: task.color,
                  }}
                >
                  {task.progress !== undefined && task.progress > 0 && (
                    <div
                      className="h-full rounded bg-black/20"
                      style={{ width: `${Math.min(task.progress, 100)}%` }}
                    />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        {minDate.toLocaleDateString(locale)} - {maxDate.toLocaleDateString(locale)} · {tasks.length} 个任务
      </p>
    </div>
  )
}
