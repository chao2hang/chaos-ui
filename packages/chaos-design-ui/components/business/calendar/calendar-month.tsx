"use client"
import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  color?: string
  status?: "tentative" | "confirmed" | "cancelled"
}

interface CalendarMonthProps {
  date?: Date
  events?: CalendarEvent[]
  onDateChange?: (date: Date) => void
  onEventClick?: (event: CalendarEvent) => void
  onDayClick?: (date: Date) => void
  className?: string
  locale?: string
}

const STATUS_STYLES: Record<NonNullable<CalendarEvent["status"]>, string> = {
  tentative: "opacity-60 border-dashed",
  confirmed: "",
  cancelled: "line-through opacity-40",
}

export function CalendarMonth({
  date: dateProp = new Date(),
  events = [],
  onDateChange,
  onEventClick,
  onDayClick,
  className,
  locale = "zh-CN",
}: CalendarMonthProps) {
  const [current, setCurrent] = React.useState(dateProp)
  const today = React.useMemo(() => {
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return t
  }, [])

  const grid = React.useMemo(() => {
    const first = new Date(current.getFullYear(), current.getMonth(), 1)
    const startDay = first.getDay()
    const last = new Date(current.getFullYear(), current.getMonth() + 1, 0)
    const daysInMonth = last.getDate()
    const cells: { date: Date; inMonth: boolean }[] = []
    for (let i = startDay; i > 0; i--) {
      const d = new Date(first)
      d.setDate(d.getDate() - i)
      cells.push({ date: d, inMonth: false })
    }
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({ date: new Date(current.getFullYear(), current.getMonth(), i), inMonth: true })
    }
    while (cells.length % 7 !== 0 || cells.length < 42) {
      const d = new Date(cells[cells.length - 1].date)
      d.setDate(d.getDate() + 1)
      cells.push({ date: d, inMonth: false })
    }
    return cells
  }, [current])

  const eventsByDate = React.useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    events.forEach((e) => {
      const key = formatKey(e.start)
      const arr = map.get(key) ?? []
      arr.push(e)
      map.set(key, arr)
    })
    return map
  }, [events])

  const changeMonth = (delta: number) => {
    const next = new Date(current)
    next.setMonth(next.getMonth() + delta)
    setCurrent(next)
    onDateChange?.(next)
  }

  const goToday = () => {
    setCurrent(new Date())
    onDateChange?.(new Date())
  }

  const monthLabel = current.toLocaleDateString(locale, { year: "numeric", month: "long" })
  const dayNames = Array.from({ length: 7 }, (_, i) =>
    new Date(2024, 0, i + 1).toLocaleDateString(locale, { weekday: "short" })
  )

  return (
    <div data-slot="calendar-month" className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">{monthLabel}</h3>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="xs" onClick={goToday}>今天</Button>
          <Button variant="ghost" size="icon-xs" onClick={() => changeMonth(-1)} aria-label="上个月">
            <ChevronLeftIcon />
          </Button>
          <Button variant="ghost" size="icon-xs" onClick={() => changeMonth(1)} aria-label="下个月">
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center text-xs text-muted-foreground">
        {dayNames.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px rounded-md border bg-border">
        {grid.map(({ date, inMonth }, i) => {
          const key = formatKey(date)
          const dayEvents = eventsByDate.get(key) ?? []
          const isToday = date.getTime() === today.getTime()
          return (
            <button
              key={i}
              type="button"
              onClick={() => onDayClick?.(date)}
              className={cn(
                "min-h-24 bg-background p-1 text-left transition-colors hover:bg-muted/30",
                !inMonth && "text-muted-foreground/40"
              )}
            >
              <div className={cn(
                "mb-1 flex h-6 w-6 items-center justify-center rounded-full text-xs",
                isToday && "bg-primary text-primary-foreground"
              )}>
                {date.getDate()}
              </div>
              <div className="space-y-0.5">
                {dayEvents.slice(0, 3).map((e) => (
                  <div
                    key={e.id}
                    onClick={(ev) => {
                      ev.stopPropagation()
                      onEventClick?.(e)
                    }}
                    className={cn(
                      "cursor-pointer truncate rounded px-1 py-0.5 text-[0.65rem] text-white",
                      STATUS_STYLES[e.status ?? "confirmed"]
                    )}
                    style={{ backgroundColor: e.color ?? "var(--chart-1)" }}
                  >
                    {e.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-[0.65rem] text-muted-foreground">+{dayEvents.length - 3}</div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function formatKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}
