"use client"
import * as React from "react"

export interface UseAsyncFieldOptions<T> {
  fetcher: (signal: AbortSignal) => Promise<T>
  debounce?: number
  enabled?: boolean
  cache?: boolean
}

export interface UseAsyncFieldResult<T> {
  data: T | undefined
  loading: boolean
  error: Error | null
  refetch: () => void
}

const cacheStore = new Map<string, { data: unknown; ts: number }>()

export function useAsyncField<T>(
  query: string,
  { fetcher, debounce = 300, enabled = true, cache = false }: UseAsyncFieldOptions<T>
): UseAsyncFieldResult<T> {
  const [data, setData] = React.useState<T | undefined>(() => {
    if (!cache || !query) return undefined
    const key = `${fetcher.toString()}:${query}`
    const cached = cacheStore.get(key)
    if (cached && Date.now() - cached.ts < 60_000) return cached.data as T
    return undefined
  })
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const [tick, setTick] = React.useState(0)
  const debouncedRef = React.useRef(query)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortRef = React.useRef<AbortController | null>(null)

  React.useEffect(() => {
    if (!enabled) return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      debouncedRef.current = query
    }, debounce)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [query, debounce, enabled])

  React.useEffect(() => {
    if (!enabled) return
    if (!debouncedRef.current) return
    if (abortRef.current) abortRef.current.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl
    setLoading(true)
    setError(null)
    fetcher(ctrl.signal)
      .then((res) => {
        if (ctrl.signal.aborted) return
        setData(res)
        if (cache) {
          cacheStore.set(`${fetcher.toString()}:${debouncedRef.current}`, { data: res, ts: Date.now() })
        }
      })
      .catch((e) => {
        if (ctrl.signal.aborted) return
        setError(e instanceof Error ? e : new Error(String(e)))
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setLoading(false)
      })
    return () => ctrl.abort()
  }, [debouncedRef.current, enabled, tick, fetcher, cache])

  return { data, loading, error, refetch: () => setTick((t) => t + 1) }
}
