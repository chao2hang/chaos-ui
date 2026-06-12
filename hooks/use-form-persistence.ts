"use client"
import * as React from "react"

export interface UseFormPersistenceOptions<T> {
  key: string
  value: T
  enabled?: boolean
  throttle?: number
}

export function useFormPersistence<T>({
  key,
  value,
  enabled = true,
  throttle = 300,
}: UseFormPersistenceOptions<T>): {
  load: () => T | null
  clear: () => void
  hasDraft: boolean
} {
  const storageKey = `form-persistence:${key}`
  const [hasDraft, setHasDraft] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false
    try {
      return window.localStorage.getItem(storageKey) !== null
    } catch {
      return false
    }
  })

  const lastWriteRef = React.useRef(0)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    if (!enabled) return
    if (typeof window === "undefined") return
    if (timerRef.current) clearTimeout(timerRef.current)
    const now = Date.now()
    const elapsed = now - lastWriteRef.current
    const write = () => {
      lastWriteRef.current = Date.now()
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(value))
        setHasDraft(true)
      } catch {}
    }
    if (elapsed >= throttle) {
      write()
    } else {
      timerRef.current = setTimeout(write, throttle - elapsed)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [value, enabled, throttle, storageKey])

  const load = React.useCallback((): T | null => {
    if (typeof window === "undefined") return null
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (!raw) return null
      return JSON.parse(raw) as T
    } catch {
      return null
    }
  }, [storageKey])

  const clear = React.useCallback(() => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.removeItem(storageKey)
      setHasDraft(false)
    } catch {}
  }, [storageKey])

  return { load, clear, hasDraft }
}
