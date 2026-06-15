export function mark(name: string): void {
  if (typeof performance !== "undefined" && typeof performance.mark === "function") {
    performance.mark(name)
  }
}

export function measure(name: string, startMark?: string, endMark?: string): number | null {
  if (typeof performance === "undefined" || typeof performance.measure !== "function") return null
  try {
    if (startMark && endMark) {
      performance.measure(name, startMark, endMark)
    } else if (startMark) {
      performance.measure(name, startMark)
    } else {
      performance.measure(name)
    }
    const entries = performance.getEntriesByName(name)
    const last = entries[entries.length - 1]
    return last ? last.duration : null
  } catch {
    return null
  }
}

export function clearMarks(name?: string): void {
  if (typeof performance === "undefined" || typeof performance.clearMarks !== "function") return
  if (name) performance.clearMarks(name)
  else performance.clearMarks()
}

export async function time<T>(label: string, fn: () => Promise<T> | T): Promise<T> {
  const start = typeof performance !== "undefined" ? performance.now() : Date.now()
  try {
    return await fn()
  } finally {
    if (typeof performance !== "undefined") {
      const duration = performance.now() - start
      if (process.env.NODE_ENV !== "production") {
        console.info(`[perf] ${label}: ${duration.toFixed(2)}ms`)
      }
    }
  }
}
