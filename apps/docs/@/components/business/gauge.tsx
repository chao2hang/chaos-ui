"use client"
import * as React from "react"
import { cn } from "@chaos_team/chaos-ui/lib"

interface GaugeProps extends React.ComponentProps<"div"> {
  value: number
  min?: number
  max?: number
  size?: number
  strokeWidth?: number
  label?: React.ReactNode
  showValue?: boolean
  formatValue?: (v: number) => string
  variant?: "default" | "success" | "warning" | "destructive"
}

const variantStroke: Record<NonNullable<GaugeProps["variant"]>, string> = {
  default: "stroke-primary",
  success: "stroke-success",
  warning: "stroke-warning",
  destructive: "stroke-destructive",
}

/**
 * @component Gauge
 * @category business/charts
 * @since 0.2.0
 * @description SVG arc gauge meter displaying a value within a min-max range with variant coloring / SVG 弧形仪表盘，在最小最大值范围内显示数值并支持变体着色
 * @keywords gauge, meter, arc, svg, progress, chart
 * @example
 * <Gauge value={75} min={0} max={100} variant="success" label="CPU" />
 */
export function Gauge({
  value,
  min = 0,
  max = 100,
  size = 160,
  strokeWidth = 12,
  label,
  showValue = true,
  formatValue,
  variant = "default",
  className,
  ...props
}: GaugeProps) {
  const clamped = Math.max(min, Math.min(max, value))
  const pct = (clamped - min) / (max - min)
  const radius = (size - strokeWidth) / 2
  const cx = size / 2
  const cy = size / 2
  const startAngle = 135
  const endAngle = 405
  const angleRange = endAngle - startAngle
  const currentAngle = startAngle + angleRange * pct

  const polar = (angle: number) => {
    const rad = (angle * Math.PI) / 180
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) }
  }

  const start = polar(startAngle)
  const end = polar(endAngle)
  const current = polar(currentAngle)
  const largeArc = angleRange > 180 ? 1 : 0
  const currentLarge = currentAngle - startAngle > 180 ? 1 : 0

  const trackPath = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`
  const progressPath = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${currentLarge} 1 ${current.x} ${current.y}`

  const display = formatValue ? formatValue(clamped) : `${Math.round(pct * 100)}%`

  return (
    <div
      data-slot="gauge"
      role="meter"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={clamped}
      className={cn("relative inline-flex flex-col items-center justify-center", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg width={size} height={size} className="-rotate-90">
        <path
          d={trackPath}
          fill="none"
          className="stroke-muted"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d={progressPath}
          fill="none"
          className={cn(variantStroke[variant], "transition-all duration-500")}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && <div className="text-2xl font-semibold tabular-nums">{display}</div>}
        {label && <div className="mt-1 text-xs text-muted-foreground">{label}</div>}
      </div>
    </div>
  )
}

interface RadialProgressProps extends React.ComponentProps<"div"> {
  value: number
  size?: number
  strokeWidth?: number
  showValue?: boolean
  variant?: "default" | "success" | "warning" | "destructive"
}

/**
 * @component RadialProgress
 * @category business/charts
 * @since 0.2.0
 * @description Compact radial progress indicator displaying a percentage with variant coloring / 紧凑型径向进度指示器，以百分比显示并支持变体着色
 * @keywords radial, progress, circle, percentage, indicator
 * @example
 * <RadialProgress value={65} variant="success" />
 */
export function RadialProgress({
  value,
  size = 48,
  strokeWidth = 4,
  showValue = true,
  variant = "default",
  className,
  ...props
}: RadialProgressProps) {
  const pct = Math.max(0, Math.min(100, value))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference

  return (
    <div
      data-slot="radial-progress"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-muted"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className={cn(
            "transition-all duration-500",
            variantStroke[variant]
          )}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center text-[0.65rem] font-medium tabular-nums">
          {Math.round(pct)}%
        </div>
      )}
    </div>
  )
}
