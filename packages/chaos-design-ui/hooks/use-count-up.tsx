"use client"
import * as React from "react"

export function useCountUp(
  ref: React.RefObject<HTMLElement | null>,
  target: number,
  duration = 1000,
  decimals = 0,
  prefix = "",
  suffix = "",
  format?: (v: number) => string,
) {
  const rafRef = React.useRef<number | null>(null)
  const startRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    startRef.current = null

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startRef.current
      const t = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = target * eased

      const text = format
        ? format(current)
        : `${prefix}${current.toFixed(decimals)}${suffix}`
      el.textContent = text

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        const finalText = format
          ? format(target)
          : `${prefix}${target.toFixed(decimals)}${suffix}`
        el.textContent = finalText
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration, decimals, prefix, suffix, format, ref])
}
