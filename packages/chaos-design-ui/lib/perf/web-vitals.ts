export type WebVitalName = "LCP" | "CLS" | "INP" | "FCP" | "TTFB" | "FID"

export interface WebVitalMetric {
  id: string
  name: WebVitalName
  value: number
  rating: "good" | "needs-improvement" | "poor"
  delta: number
  navigationType: string
  entries: PerformanceEntry[]
}

type Reporter = (metric: WebVitalMetric) => void

const reporters = new Set<Reporter>()

export function onReportVital(reporter: Reporter): () => void {
  reporters.add(reporter)
  return () => reporters.delete(reporter)
}

const thresholds: Record<WebVitalName, [number, number]> = {
  LCP: [2500, 4000],
  CLS: [0.1, 0.25],
  INP: [200, 500],
  FCP: [1800, 3000],
  TTFB: [800, 1800],
  FID: [100, 300],
}

export function rate(name: WebVitalName, value: number): "good" | "needs-improvement" | "poor" {
  const [good, poor] = thresholds[name]
  if (value <= good) return "good"
  if (value <= poor) return "needs-improvement"
  return "poor"
}

let counter = 0

type EmittedMetric = Pick<WebVitalMetric, "name" | "value"> & {
  entries?: PerformanceEntry[]
  delta?: number
}

function emit(metric: EmittedMetric) {
  const { name, value, entries, delta } = metric
  const payload: WebVitalMetric = {
    id: `v${Date.now()}-${counter++}`,
    name,
    value,
    delta: delta ?? 0,
    navigationType: "navigate",
    entries: entries ?? [],
    rating: rate(name, value),
  }
  reporters.forEach((r) => r(payload))
}

export function reportVital(name: WebVitalName, value: number, entries: PerformanceEntry[] = []) {
  emit({ name, value, entries })
}

export function startWebVitals() {
  if (typeof window === "undefined" || typeof PerformanceObserver === "undefined") return () => {}

  const tryObserve = (type: string, name: WebVitalName, getValue: (e: PerformanceEntry) => number) => {
    try {
      const obs = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceEntry[]
        const last = entries[entries.length - 1]
        if (last) emit({ name, value: getValue(last), entries })
      })
      obs.observe({ type, buffered: true })
      return () => obs.disconnect()
    } catch {
      return () => {}
    }
  }

  const cleanups = [
    tryObserve("largest-contentful-paint", "LCP", (e) => e.startTime),
    tryObserve("layout-shift", "CLS", (e) => (e as unknown as { value: number }).value),
    tryObserve("first-input", "FID", (e) => (e as unknown as { processingStart: number; startTime: number }).processingStart - e.startTime),
    tryObserve("paint", "FCP", (e) => e.startTime),
    tryObserve("navigation", "TTFB", (e) => (e as unknown as { responseStart: number; requestStart: number }).responseStart - (e as unknown as { requestStart: number }).requestStart),
  ]

  return () => cleanups.forEach((fn) => fn())
}
