"use client"

import * as React from "react"

interface ScrollState {
  x: number
  y: number
  isScrolled: boolean
  /** Scroll direction: 'up' | 'down' | null (initial) */
  direction: "up" | "down" | null
}

/**
 * Tracks scroll position and direction.
 * @param throttleMs - Throttle interval in ms (default 50)
 * @param target - Scroll target element ref (defaults to window)
 * @since 0.2.0
 */
export function useScroll(
  throttleMs = 50,
  target?: React.RefObject<HTMLElement | null>,
): ScrollState {
  const [state, setState] = React.useState<ScrollState>({
    x: 0,
    y: 0,
    isScrolled: false,
    direction: null,
  })
  const lastY = React.useRef(0)
  const lastTime = React.useRef(0)

  React.useEffect(() => {
    const el = target?.current
    const isWindow = !el

    const getScroll = () => ({
      x: isWindow ? window.scrollX : el!.scrollLeft,
      y: isWindow ? window.scrollY : el!.scrollTop,
    })

    const handler = () => {
      const now = Date.now()
      if (now - lastTime.current < throttleMs) return
      lastTime.current = now

      const { x, y } = getScroll()
      const dy = y - lastY.current
      setState({
        x,
        y,
        isScrolled: y > 0,
        direction: dy > 0 ? "down" : dy < 0 ? "up" : null,
      })
      lastY.current = y
    }

    const scrollTarget = isWindow ? window : el!
    scrollTarget.addEventListener("scroll", handler, { passive: true })
    return () => scrollTarget.removeEventListener("scroll", handler)
  }, [throttleMs, target])

  return state
}

/**
 * Convenience hook: returns just the scroll direction.
 * @since 0.2.0
 */
export function useScrollDirection(
  throttleMs = 50,
  target?: React.RefObject<HTMLElement | null>,
): "up" | "down" | null {
  return useScroll(throttleMs, target).direction
}
