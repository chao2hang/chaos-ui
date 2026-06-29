"use client"
import * as React from "react"

export function useThrottle<T>(value: T, interval = 300): T {
  const [throttled, setThrottled] = React.useState(value)
  const lastRan = React.useRef(0)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  React.useEffect(() => {
    const now = Date.now()
    const elapsed = now - lastRan.current
    if (elapsed >= interval) {
      lastRan.current = now
      setThrottled(value)
    } else {
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        lastRan.current = Date.now()
        setThrottled(value)
      }, interval - elapsed)
    }
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [value, interval])
  return throttled
}
