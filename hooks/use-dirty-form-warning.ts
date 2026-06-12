"use client"
import * as React from "react"

export interface UseDirtyFormWarningOptions {
  enabled?: boolean
  message?: string
  onAttemptLeave?: () => boolean | void
}

export function useDirtyFormWarning(
  isDirty: boolean,
  options: UseDirtyFormWarningOptions = {}
): { confirmLeave: () => boolean } {
  const { enabled = true, message = "您有未保存的更改，确定离开吗？", onAttemptLeave } = options
  const enabledRef = React.useRef(enabled)
  React.useEffect(() => {
    enabledRef.current = enabled
  }, [enabled])

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const handler = (e: BeforeUnloadEvent) => {
      if (!enabledRef.current || !isDirty) return
      e.preventDefault()
      e.returnValue = message
      return message
    }
    window.addEventListener("beforeunload", handler)
    return () => window.removeEventListener("beforeunload", handler)
  }, [isDirty, message])

  const confirmLeave = React.useCallback((): boolean => {
    if (!isDirty) return true
    if (onAttemptLeave) {
      const result = onAttemptLeave()
      if (result === false) return false
    }
    if (typeof window !== "undefined") {
      return window.confirm(message)
    }
    return true
  }, [isDirty, message, onAttemptLeave])

  return { confirmLeave }
}
