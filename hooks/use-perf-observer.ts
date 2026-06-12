"use client"
import * as React from "react"
import { startWebVitals, onReportVital, type WebVitalMetric } from "@/lib/perf"

export function usePerfObserver(enabled = true): {
  metrics: WebVitalMetric[]
  clear: () => void
} {
  const [metrics, setMetrics] = React.useState<WebVitalMetric[]>([])

  React.useEffect(() => {
    if (!enabled) return
    const off = onReportVital((m) => {
      setMetrics((prev) => {
        const idx = prev.findIndex((p) => p.name === m.name)
        if (idx >= 0) {
          const next = prev.slice()
          next[idx] = m
          return next
        }
        return [...prev, m]
      })
    })
    const stop = startWebVitals()
    return () => {
      off()
      stop()
    }
  }, [enabled])

  return { metrics, clear: () => setMetrics([]) }
}
