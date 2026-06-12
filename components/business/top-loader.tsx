"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

export function TopLoader({
  progress,
  loading,
  className,
}: {
  progress?: number
  loading?: boolean
  className?: string
}) {
  const [internalProgress, setInternalProgress] = React.useState(0)
  const [active, setActive] = React.useState(loading ?? false)

  React.useEffect(() => {
    if (loading) {
      setActive(true)
      setInternalProgress(0)
      let p = 0
      const id = setInterval(() => {
        p = Math.min(p + Math.random() * 15, 90)
        setInternalProgress(p)
      }, 200)
      return () => {
        clearInterval(id)
        setInternalProgress(100)
        const t = setTimeout(() => setActive(false), 300)
        return () => clearTimeout(t)
      }
    }
    if (progress !== undefined) {
      setActive(true)
      setInternalProgress(progress)
      if (progress >= 100) {
        const t = setTimeout(() => setActive(false), 300)
        return () => clearTimeout(t)
      }
    }
  }, [loading, progress])

  if (!active && internalProgress === 0) return null

  return (
    <div
      data-slot="top-loader"
      role="progressbar"
      aria-valuenow={Math.round(internalProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "pointer-events-none fixed left-0 right-0 top-0 z-[100] h-0.5 overflow-hidden",
        className
      )}
    >
      <div
        className="h-full bg-primary transition-all duration-200"
        style={{ width: `${internalProgress}%` }}
      />
    </div>
  )
}
