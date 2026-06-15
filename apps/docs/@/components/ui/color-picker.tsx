"use client"
import * as React from "react"
import { HexColorPicker, HexColorInput } from "react-colorful"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const presetColors = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#14b8a6",
  "#3b82f6", "#6366f1", "#a855f7", "#ec4899", "#6b7280",
]

function ColorPicker({ value = "#000000", onChange, presets = presetColors, className }: {
  value?: string
  onChange?: (color: string) => void
  presets?: string[]
  className?: string
}) {
  return (
    <Popover>
      <PopoverTrigger className={cn("inline-flex h-10 w-10 items-center justify-center rounded-md border-2 border-input bg-transparent", className)}>
        <div className="size-6 rounded-sm" style={{ backgroundColor: value }} />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <div className="space-y-3">
          <HexColorPicker color={value} onChange={onChange} style={{ width: "100%", height: 160 }} />
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">#</span>
            <HexColorInput
              color={value}
              onChange={onChange}
              className="flex h-8 w-full rounded-md border border-input bg-transparent px-2 text-sm"
              prefixed
            />
          </div>
          {presets && presets.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {presets.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={cn(
                    "size-6 rounded-md border transition-transform hover:scale-110",
                    value === color && "ring-2 ring-primary ring-offset-1"
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => onChange?.(color)}
                />
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { ColorPicker }
