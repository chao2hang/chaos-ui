"use client"

import * as React from "react"

interface ConnectionInfo {
  downlink?: number
  effectiveType?: string
  rtt?: number
  saveData?: boolean
  addEventListener?: (type: string, listener: EventListener) => void
  removeEventListener?: (type: string, listener: EventListener) => void
}

interface NetworkState {
  online: boolean
  downlink?: number | undefined
  effectiveType?: string | undefined
  rtt?: number | undefined
  saveData?: boolean | undefined
}

function getConn(): ConnectionInfo | undefined {
  if (typeof navigator === "undefined") return undefined
  return ((navigator as Navigator & { connection?: ConnectionInfo }).connection)
}

/**
 * Tracks browser online/offline status and network info via Navigator.connection API.
 * @since 0.2.0
 */
export function useNetworkStatus(): NetworkState {
  const [state, setState] = React.useState<NetworkState>(() => {
    const conn = getConn()
    return {
      online: navigator.onLine,
      ...(conn
        ? {
            downlink: conn.downlink,
            effectiveType: conn.effectiveType,
            rtt: conn.rtt,
            saveData: conn.saveData,
          }
        : {}),
    }
  })

  React.useEffect(() => {
    const handleOnline = () => setState((s): NetworkState => ({ ...s, online: true }))
    const handleOffline = () => setState((s): NetworkState => ({ ...s, online: false }))
    const handleChange = () => {
      const conn = getConn()
      if (conn) {
        setState((s): NetworkState => ({
          ...s,
          downlink: conn.downlink,
          effectiveType: conn.effectiveType,
          rtt: conn.rtt,
          saveData: conn.saveData,
        }))
      }
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    const conn = getConn()
    conn?.addEventListener?.("change", handleChange)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      conn?.removeEventListener?.("change", handleChange)
    }
  }, [])

  return state
}
