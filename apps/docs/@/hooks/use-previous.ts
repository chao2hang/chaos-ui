"use client"
import * as React from "react"

export function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T | undefined>(undefined)
  React.useEffect(() => {
    ref.current = value
  }, [value])
  // eslint-disable-next-line react-hooks/refs -- reading the ref is the purpose of usePrevious.
  return ref.current
}
