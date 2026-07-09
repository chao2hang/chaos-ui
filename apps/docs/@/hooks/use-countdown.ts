"use client"
import * as React from "react"

export function useCountdown(target: Date | number | string) {
  const targetTime = React.useMemo(() => new Date(target).getTime(), [target])
  const [now, setNow] = React.useState(() => Date.now())

  React.useEffect(() => {
    if (Number.isNaN(targetTime)) return
    // If already past the target, no need to tick.
    if (targetTime <= Date.now()) return
    const id = setInterval(() => {
      const current = Date.now()
      // Stop ticking once the countdown finishes; update now first so the
      // final render reflects isFinished=true (otherwise now stays stale).
      if (targetTime <= current) {
        setNow(current)
        clearInterval(id)
        return
      }
      setNow(current)
    }, 1000)
    return () => clearInterval(id)
  }, [targetTime])

  const diff = Math.max(0, targetTime - now)
  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  // Finished when diff hits 0 OR target was invalid (NaN) — treat as elapsed.
  const isFinished = diff <= 0 || Number.isNaN(targetTime)

  return { days, hours, minutes, seconds, isFinished, totalSeconds }
}
