"use client"
import * as React from "react"
import { useInView } from "@chaos_team/chaos-ui/hooks"

export interface UseInfiniteScrollOptions {
  threshold?: number
  rootMargin?: string
  enabled?: boolean
}

export function useInfiniteScroll<T>(
  loadMore: () => Promise<{ items: T[]; hasMore: boolean }> | { items: T[]; hasMore: boolean },
  options: UseInfiniteScrollOptions = {}
) {
  const { enabled = true } = options
  const [items, setItems] = React.useState<T[]>([])
  const [hasMore, setHasMore] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const sentinelRef = React.useRef<HTMLDivElement | null>(null)
  const inView = useInView(sentinelRef, {
    rootMargin: options.rootMargin ?? "100px",
    threshold: options.threshold ?? 0,
  })
  const loadMoreRef = React.useRef(loadMore)

  React.useEffect(() => {
    loadMoreRef.current = loadMore
  }, [loadMore])

  const load = React.useCallback(async () => {
    if (loading || !hasMore || !enabled) return
    setLoading(true)
    setError(null)
    try {
      const res = await loadMoreRef.current()
      setItems((prev) => [...prev, ...res.items])
      setHasMore(res.hasMore)
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)))
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, enabled])

  React.useEffect(() => {
    if (!inView) return
    const timeout = window.setTimeout(() => {
      void load()
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [inView, load])

  const reset = React.useCallback(() => {
    setItems([])
    setHasMore(true)
    setError(null)
  }, [])

  return { items, hasMore, loading, error, sentinelRef, loadMore: load, reset }
}
