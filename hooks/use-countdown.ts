"use client"
import * as React from "react"

export function useCountdown(target: Date | number | string) {
  const targetTime = React.useMemo(() => new Date(target).getTime(), [target])
  const [now, setNow] = React.useState(() => Date.now())

  React.useEffect(() => {
    if (Number.isNaN(targetTime)) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [targetTime])

  const diff = Math.max(0, targetTime - now)
  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const isFinished = diff <= 0

  return { days, hours, minutes, seconds, isFinished, totalSeconds }
}
