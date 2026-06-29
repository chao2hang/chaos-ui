"use client"
import * as React from "react"

export function useCopyToClipboard(): [
  boolean,
  (value: string) => Promise<boolean>,
  () => void
] {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copy = React.useCallback(async (value: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return false
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
      return true
    } catch {
      return false
    }
  }, [])

  const reset = React.useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    setCopied(false)
  }, [])

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  return [copied, copy, reset]
}
