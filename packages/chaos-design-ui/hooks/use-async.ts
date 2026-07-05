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
  // 把 fn 放进 ref,避免 fn 引用变化时 run 重建触发 immediate 的 effect 重跑。
  // 这是最常见的 useAsync 误用 bug:开发者每次 render 传一个新闭包 fn,
  // 导致 immediate effect 每次都重新发起请求。
  const fnRef = React.useRef(fn)
  fnRef.current = fn

  React.useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const run = React.useCallback(async (...args: Args) => {
    lastArgs.current = args
    // 保留上一次的 data,避免 pending 时把 UI 已展示的 data 抹掉
    setState((s) => ({ status: "pending", data: s.data, error: undefined }))
    try {
      const data = await fnRef.current(...args)
      if (!mountedRef.current) return
      setState({ status: "success", data, error: undefined })
      return data
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      if (!mountedRef.current) return
      setState({ status: "error", data: undefined, error })
      throw error
    }
  }, [])

  React.useEffect(() => {
    if (!immediate) return
    const args = (lastArgs.current ?? []) as Args
    const id = requestAnimationFrame(() => void run(...args))
    return () => cancelAnimationFrame(id)
  }, [immediate, run])

  return { ...state, run, isLoading: state.status === "pending" }
}
