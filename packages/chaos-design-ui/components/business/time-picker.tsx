"use client"
import * as React from "react"
import { ClockIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatTime } from "@/lib/format"

interface TimePickerProps {
  value?: string
  onChange?: (value: string) => void
  step?: 1 | 5 | 10 | 15 | 30 | 60
  format?: "12h" | "24h"
  disabled?: boolean
  placeholder?: string
  className?: string
}

function pad(n: number) {
  return n.toString().padStart(2, "0")
}

function format12h(h: number, m: number) {
  const period = h >= 12 ? "PM" : "AM"
  const hh = h % 12 || 12
  return `${hh}:${pad(m)} ${period}`
}

function parseTime(value: string): { h: number; m: number } | null {
  const match24 = /^(\d{1,2}):(\d{2})$/.exec(value)
  if (match24) {
    const h = Number(match24[1])
    const m = Number(match24[2])
    if (h >= 0 && h < 24 && m >= 0 && m < 60) return { h, m }
  }
  const match12 = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(value)
  if (match12) {
    let h = Number(match12[1])
    const m = Number(match12[2])
    const period = match12[3].toUpperCase()
    if (period === "PM" && h < 12) h += 12
    if (period === "AM" && h === 12) h = 0
    if (h >= 0 && h < 24 && m >= 0 && m < 60) return { h, m }
  }
  return null
}

export function TimePicker({
  value,
  onChange,
  step = 1,
  format = "24h",
  disabled,
  placeholder = "选择时间",
  className,
}: TimePickerProps) {
  const parsed = value ? parseTime(value) : null
  const hours = React.useMemo(() => {
    const arr: number[] = []
    const max = format === "12h" ? 12 : 24
    for (let h = format === "12h" ? 1 : 0; h < max; h++) arr.push(h)
    return arr
  }, [format])
  const minutes = React.useMemo(() => {
    const arr: number[] = []
    for (let m = 0; m < 60; m += step) arr.push(m)
    return arr
  }, [step])

  const handleChange = (h: number, m: number) => {
    const result = format === "12h" ? format12h(h, m) : `${pad(h)}:${pad(m)}`
    onChange?.(result)
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-[160px] justify-start text-left font-normal",
              !value && "text-muted-foreground",
              className
            )}
          />
        }
      >
        <ClockIcon />
        {value ?? <span>{placeholder}</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <div className="flex items-center gap-2">
          <Select
            value={parsed ? String(parsed.h) : undefined}
            onValueChange={(v) => {
              const m = parsed?.m ?? 0
              handleChange(Number(v), m)
            }}
          >
            <SelectTrigger className="w-[88px]" aria-label="小时">
              <SelectValue placeholder="时" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {hours.map((h) => (
                <SelectItem key={h} value={String(h)}>
                  {format === "12h" ? (h === 12 ? 12 : h) : pad(h)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>:</span>
          <Select
            value={parsed ? String(parsed.m) : undefined}
            onValueChange={(v) => {
              const h = parsed?.h ?? 0
              handleChange(h, Number(v))
            }}
          >
            <SelectTrigger className="w-[88px]" aria-label="分钟">
              <SelectValue placeholder="分" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {minutes.map((m) => (
                <SelectItem key={m} value={String(m)}>
                  {pad(m)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function formatTimeInput(h: number, m: number, format: "12h" | "24h" = "24h") {
  return format === "12h" ? format12h(h, m) : formatTime(new Date(2000, 0, 1, h, m), { timeStyle: "short" })
}
