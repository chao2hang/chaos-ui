"use client"
import * as React from "react"

export function useDocumentVisibility(): "visible" | "hidden" {
  const [visibility, setVisibility] = React.useState<"visible" | "hidden">(() => {
    if (typeof document === "undefined") return "visible"
    return document.visibilityState === "hidden" ? "hidden" : "visible"
  })

  React.useEffect(() => {
    if (typeof document === "undefined") return
    const onChange = () => setVisibility(document.visibilityState === "hidden" ? "hidden" : "visible")
    document.addEventListener("visibilitychange", onChange)
    return () => document.removeEventListener("visibilitychange", onChange)
  }, [])

  return visibility
}
