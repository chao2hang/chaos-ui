"use client"

import * as React from "react"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface MobileSelectOption {
  value: string
  label: string
}

interface MobileSelectProps {
  options: MobileSelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

function MobileSelect({ options, value, onValueChange, placeholder, disabled, className }: MobileSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger
        className={cn(
          "h-12 px-4 text-base w-full",
          "md:h-8 md:px-2.5 md:text-sm",
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { MobileSelect }
export type { MobileSelectProps, MobileSelectOption }
