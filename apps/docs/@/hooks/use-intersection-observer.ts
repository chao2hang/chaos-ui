"use client"
import * as React from "react"

interface Options {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  triggerOnce?: boolean
  enabled?: boolean
}

export function useIntersectionObserver<T extends Element>(
  ref: React.RefObject<T | null>,
  options: Options = {}
): IntersectionObserverEntry | null {
  const { enabled = true, triggerOnce = false, ...init } = options
  const [entry, setEntry] = React.useState<IntersectionObserverEntry | null>(null)
  const frozen = React.useRef(false)

  React.useEffect(() => {
    if (!enabled || frozen.current) return
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === "undefined") {
      setEntry({
        isIntersecting: true,
        target: node,
        boundingClientRect: node.getBoundingClientRect(),
        intersectionRatio: 1,
        intersectionRect: node.getBoundingClientRect(),
        rootBounds: null,
        time: Date.now(),
      } as IntersectionObserverEntry)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0]
        setEntry(e)
        if (triggerOnce && e.isIntersecting) {
          frozen.current = true
          observer.disconnect()
        }
      },
      init
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, enabled, triggerOnce, init])

  return entry
}

export function useInView<T extends Element>(
  ref: React.RefObject<T | null>,
  options: Omit<Options, "enabled"> = {}
): boolean {
  return !!useIntersectionObserver(ref, options)?.isIntersecting
}
