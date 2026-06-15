"use client"
import * as React from "react"
import { useDebounce } from "./use-debounce"

export type AutosaveStatus = "idle" | "saving" | "saved" | "error"

export interface UseFormAutosaveOptions<T> {
  value: T
  onSave: (value: T) => Promise<void> | void
  delay?: number
  enabled?: boolean
  equalityFn?: (a: T, b: T) => boolean
  onStatusChange?: (status: AutosaveStatus) => void
}

export interface UseFormAutosaveResult {
  status: AutosaveStatus
  lastSaved: number | null
  error: Error | null
  save: () => Promise<void>
  reset: () => void
}

export function useFormAutosave<T>({
  value,
  onSave,
  delay = 800,
  enabled = true,
  equalityFn = (a, b) => a === b,
  onStatusChange,
}: UseFormAutosaveOptions<T>): UseFormAutosaveResult {
  const [status, setStatus] = React.useState<AutosaveStatus>("idle")
  const [lastSaved, setLastSaved] = React.useState<number | null>(null)
  const [error, setError] = React.useState<Error | null>(null)
  const debounced = useDebounce(value, delay)
  const lastValueRef = React.useRef<T>(value)
  const mountedRef = React.useRef(true)
  const inFlightRef = React.useRef(false)

  React.useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const updateStatus = React.useCallback(
    (next: AutosaveStatus) => {
      setStatus(next)
      onStatusChange?.(next)
    },
    [onStatusChange]
  )

  const save = React.useCallback(async () => {
    if (inFlightRef.current) return
    inFlightRef.current = true
    updateStatus("saving")
    setError(null)
    try {
      await onSave(value)
      if (!mountedRef.current) return
      lastValueRef.current = value
      setLastSaved(Date.now())
      updateStatus("saved")
    } catch (e) {
      if (!mountedRef.current) return
      setError(e instanceof Error ? e : new Error(String(e)))
      updateStatus("error")
    } finally {
      inFlightRef.current = false
    }
  }, [onSave, value, updateStatus])

  React.useEffect(() => {
    if (!enabled) return
    if (equalityFn(debounced, lastValueRef.current)) return
    void save()
  }, [debounced, enabled, equalityFn, save])

  const reset = React.useCallback(() => {
    lastValueRef.current = value
    setError(null)
    updateStatus("idle")
  }, [value, updateStatus])

  return { status, lastSaved, error, save, reset }
}
