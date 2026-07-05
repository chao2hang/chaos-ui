"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

interface FormProgressProps extends Omit<React.ComponentPropsWithoutRef<"div">, "onChange" | "ref"> {
  current: number
  total: number
  labels?: string[]
  className?: string
  showLabels?: boolean
  variant?: "bar" | "steps" | "dots"
  ref?: React.Ref<HTMLElement>
}

export function FormProgress({
  current,
  total,
  labels,
  className,
  showLabels = true,
  variant = "bar",
  ref,
  ...props
}: FormProgressProps) {
  const pct = total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0
  const settledRef = ref ?? null

  if (variant === "bar") {
    return (
      <div
        data-slot="form-progress"
        ref={settledRef as React.Ref<HTMLDivElement> | null}
        className={cn("space-y-1.5", className)}
        {...props}
      >
        {showLabels && (
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{labels?.[current - 1] ?? `步骤 ${current}`}</span>
            <span className="tabular-nums">{Math.round(pct)}%</span>
          </div>
        )}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={current}
            aria-valuemin={0}
            aria-valuemax={total}
          />
        </div>
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div
        data-slot="form-progress"
        ref={settledRef as React.Ref<HTMLDivElement> | null}
        className={cn("flex items-center gap-1.5", className)}
        {...props}
      >
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i < current ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <ol
      data-slot="form-progress"
      ref={settledRef as React.Ref<HTMLOListElement> | null}
      className={cn("flex items-center gap-2", className)}
      {...(props as React.OlHTMLAttributes<HTMLOListElement>)}
    >
      {Array.from({ length: total }).map((_, i) => {
        const done = i < current
        const active = i === current - 1
        return (
          <React.Fragment key={i}>
            <li
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-medium transition-colors",
                done
                  ? "bg-primary text-primary-foreground"
                  : active
                    ? "border-2 border-primary text-primary"
                    : "border border-muted-foreground/30 text-muted-foreground"
              )}
            >
              {i + 1}
            </li>
            {i < total - 1 && (
              <li
                aria-hidden
                className={cn("h-px flex-1", done ? "bg-primary" : "bg-muted")}
              />
            )}
          </React.Fragment>
        )
      })}
    </ol>
  )
}
