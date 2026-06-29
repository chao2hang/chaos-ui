"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type Phase = "hidden" | "loading" | "completing"

export function TopLoader({
  progress,
  loading,
  className,
}: {
  progress?: number
  loading?: boolean
  className?: string
}) {
  const [phase, setPhase] = React.useState<Phase>("hidden")
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const scheduleComplete = React.useCallback(() => {
    clearTimer()
    setPhase("completing")
    timerRef.current = setTimeout(() => setPhase("hidden"), 400)
  }, [clearTimer])

  React.useEffect(() => {
    clearTimer()

    if (loading) {
      setPhase("loading")
      return () => scheduleComplete()
    }

    if (progress !== undefined) {
      setPhase("loading")
      if (progress >= 100) scheduleComplete()
      return clearTimer
    }

    return clearTimer
  }, [loading, progress, clearTimer, scheduleComplete])

  React.useEffect(() => () => clearTimer(), [clearTimer])

  if (phase === "hidden") return null

  return (
    <div
      data-slot="top-loader"
      data-state={phase}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5 overflow-hidden bg-primary/15",
        "transition-opacity duration-300 ease-out",
        phase === "completing" ? "opacity-0" : "opacity-100",
        className
      )}
    >
      {phase === "loading" && (
        <div
          data-slot="top-loader-bar"
          className="h-full w-1/3 bg-primary top-loader-indicator"
        />
      )}
      {phase === "completing" && (
        <div className="h-full w-full bg-primary" />
      )}
    </div>
  )
}
