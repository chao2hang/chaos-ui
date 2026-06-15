"use client"
import * as React from "react"

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const read = React.useCallback((): T => {
    if (typeof window === "undefined") return initialValue
    try {
      const raw = window.localStorage.getItem(key)
      return raw == null ? initialValue : (JSON.parse(raw) as T)
    } catch {
      return initialValue
    }
  }, [key, initialValue])

  const [value, setValue] = React.useState<T>(read)

  const set = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = next instanceof Function ? next(prev) : next
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved))
        } catch {}
        return resolved
      })
    },
    [key]
  )

  const remove = React.useCallback(() => {
    try {
      window.localStorage.removeItem(key)
    } catch {}
    setValue(initialValue)
  }, [key, initialValue])

  React.useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === key) setValue(read())
    }
    window.addEventListener("storage", handler)
    return () => window.removeEventListener("storage", handler)
  }, [key, read])

  return [value, set, remove]
}
