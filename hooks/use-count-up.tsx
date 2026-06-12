"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

export function useCountUp(target: number, duration = 1000): number {
  const [value, setValue] = React.useState(0)
  const rafRef = React.useRef<number | null>(null)
  const startRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    startRef.current = null
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startRef.current
      const t = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(target * eased)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setValue(target)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration])

  return value
}
