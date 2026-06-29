"use client"

import * as React from "react"

type Orientation = "portrait" | "landscape"

/**
 * Tracks device screen orientation.
 * @since 0.2.0
 */
export function useOrientation(): Orientation {
  const [orientation, setOrientation] = React.useState<Orientation>(() => {
    if (typeof window === "undefined") return "portrait"
    return window.innerWidth > window.innerHeight ? "landscape" : "portrait"
  })

  React.useEffect(() => {
    const handler = () => {
      setOrientation(
        window.innerWidth > window.innerHeight ? "landscape" : "portrait",
      )
    }

    // Use both screen.orientation change and resize as fallback
    screen.orientation?.addEventListener?.("change", handler)
    window.addEventListener("resize", handler)
    return () => {
      screen.orientation?.removeEventListener?.("change", handler)
      window.removeEventListener("resize", handler)
    }
  }, [])

  return orientation
}
