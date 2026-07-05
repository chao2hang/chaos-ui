"use client"
import * as React from "react"

export function useOnlineStatus(): boolean {
  const [online, setOnline] = React.useState<boolean>(() =>
    typeof navigator === "undefined" ? true : navigator.onLine
  )

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const onOnline = () => setOnline(true)
    const onOffline = () => setOnline(false)
    window.addEventListener("online", onOnline)
    window.addEventListener("offline", onOffline)
    return () => {
      window.removeEventListener("online", onOnline)
      window.removeEventListener("offline", onOffline)
    }
  }, [])

  return online
}

export function useConnectionType(): string | null {
  const [type, setType] = React.useState<string | null>(() => {
    if (typeof navigator === "undefined") return null
    const conn = (
      navigator as unknown as { connection?: NetworkConnectionLike }
    ).connection
    return conn?.effectiveType ?? null
  })

  React.useEffect(() => {
    if (typeof navigator === "undefined") return
    const conn = (
      navigator as unknown as { connection?: NetworkConnectionLike }
    ).connection
    if (!conn?.addEventListener) return
    const update = () => setType(conn.effectiveType ?? null)
    conn.addEventListener("change", update)
    return () => {
      conn.removeEventListener?.("change", update)
    }
  }, [])

  return type
}

interface NetworkConnectionLike {
  effectiveType?: string
  addEventListener?: (type: string, cb: () => void) => void
  removeEventListener?: (type: string, cb: () => void) => void
}
