"use client"

import * as React from "react"

interface WindowSize {
  width: number
  height: number
}

/**
 * Reactive window dimensions, updated on resize (debounced).
 * @param debounceMs - Debounce delay in ms (default 100)
 * @since 0.2.0
 */
export function useWindowSize(debounceMs = 100): WindowSize {
  const [size, setSize] = React.useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  React.useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }, debounceMs)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timeoutId)
    }
  }, [debounceMs])

  return size
}
