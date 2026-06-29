"use client"
import * as React from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia(query).matches
  })

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const mql = window.matchMedia(query)
    const handler = () => setMatches(mql.matches)
    mql.addEventListener("change", handler)
    const timeout = window.setTimeout(() => setMatches(mql.matches), 0)
    return () => {
      window.clearTimeout(timeout)
      mql.removeEventListener("change", handler)
    }
  }, [query])

  return matches
}

export const useIsDesktop = (breakpoint = 1024) =>
  useMediaQuery(`(min-width: ${breakpoint}px)`)

export const useIsTablet = (min = 768, max = 1023) =>
  useMediaQuery(`(min-width: ${min}px) and (max-width: ${max}px)`)
