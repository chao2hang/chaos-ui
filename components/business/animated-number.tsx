"use client"
import * as React from "react"
import { useCountUp } from "@/hooks/use-count-up"
import { cn } from "@/lib/utils"

interface AnimatedNumberProps extends Omit<React.ComponentProps<"span">, "children"> {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  format?: (v: number) => string
  className?: string
}

export function AnimatedNumber({
  value,
  duration = 1000,
  decimals = 0,
  prefix = "",
  suffix = "",
  format,
  className,
  ...props
}: AnimatedNumberProps) {
  const display = useCountUp(value, duration)
  const text = format
    ? format(display)
    : `${prefix}${display.toFixed(decimals)}${suffix}`
  return (
    <span data-slot="animated-number" className={cn("tabular-nums", className)} {...props}>
      {text}
    </span>
  )
}
