"use client"
import * as React from "react"

export type AsyncStatus = "idle" | "pending" | "success" | "error"

export interface AsyncState<T> {
  status: AsyncStatus
  data: T | undefined
  error: Error | undefined
}

export function useAsync<T, Args extends unknown[] = []>(
  fn: (...args: Args) => Promise<T>,
  immediate = true
) {
  const [state, setState] = React.useState<AsyncState<T>>({
    status: "idle",
    data: undefined,
    error: undefined,
  })
  const mountedRef = React.useRef(true)
  const lastArgs = React.useRef<Args | null>(null)

  React.useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const run = React.useCallback(
    async (...args: Args) => {
      lastArgs.current = args
      setState({ status: "pending", data: state.data, error: undefined })
      try {
        const data = await fn(...args)
        if (!mountedRef.current) return
        setState({ status: "success", data, error: undefined })
        return data
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        if (!mountedRef.current) return
        setState({ status: "error", data: undefined, error })
        throw error
      }
    },
    [fn, state.data]
  )

  React.useEffect(() => {
    if (immediate) {
      run(...((lastArgs.current ?? []) as Args))
    }
  }, [immediate, run])

  return { ...state, run, isLoading: state.status === "pending" }
}
