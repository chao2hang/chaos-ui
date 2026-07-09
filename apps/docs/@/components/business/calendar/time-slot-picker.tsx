"use client"
import * as React from "react"
import { cn } from "@chaos_team/chaos-ui/lib"

export interface TimeSlot {
  start: Date
  end: Date
  available?: boolean
  label?: string
}

interface TimeSlotPickerProps {
  date: Date
  slots?: TimeSlot[]
  selected?: Date
  onSelect?: (slot: Date) => void
  startHour?: number
  endHour?: number
  stepMinutes?: number
  className?: string
  locale?: string
}

export function TimeSlotPicker({
  date,
  slots,
  selected,
  onSelect,
  startHour = 9,
  endHour = 18,
  stepMinutes = 30,
  className,
  locale = "zh-CN",
}: TimeSlotPickerProps) {
  const generated = React.useMemo<TimeSlot[]>(() => {
    if (slots) return slots
    const out: TimeSlot[] = []
    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += stepMinutes) {
        const start = new Date(date)
        start.setHours(h, m, 0, 0)
        const end = new Date(start)
        end.setMinutes(end.getMinutes() + stepMinutes)
        out.push({ start, end, available: true })
      }
    }
    return out
  }, [date, slots, startHour, endHour, stepMinutes])

  return (
    <div data-slot="time-slot-picker" className={cn("grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6", className)}>
      {generated.map((slot, i) => {
        const isSelected = selected?.getTime() === slot.start.getTime()
        return (
          <button
            key={i}
            type="button"
            disabled={!slot.available}
            onClick={() => onSelect?.(slot.start)}
            className={cn(
              "rounded-md border px-3 py-2 text-sm transition-colors",
              isSelected && "border-primary bg-primary text-primary-foreground",
              !isSelected && slot.available && "hover:border-primary hover:bg-primary/5",
              !slot.available && "cursor-not-allowed opacity-40"
            )}
          >
            {slot.start.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })}
          </button>
        )
      })}
    </div>
  )
}
