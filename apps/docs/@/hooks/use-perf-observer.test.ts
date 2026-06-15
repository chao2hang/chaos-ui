import { describe, it, expect, vi } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { usePerfObserver } from "./use-perf-observer"
import { rate } from "@/lib/perf"

describe("usePerfObserver", () => {
  it("starts with empty metrics", () => {
    const { result } = renderHook(() => usePerfObserver())
    expect(result.current.metrics).toEqual([])
  })

  it("does not observe when disabled", () => {
    const { result } = renderHook(() => usePerfObserver(false))
    expect(result.current.metrics).toEqual([])
  })

  it("clears metrics", () => {
    const { result } = renderHook(() => usePerfObserver(false))
    act(() => {
      result.current.clear()
    })
    expect(result.current.metrics).toEqual([])
  })
})

describe("rate (web-vitals)", () => {
  it("rates LCP", () => {
    expect(rate("LCP", 1000)).toBe("good")
    expect(rate("LCP", 3000)).toBe("needs-improvement")
    expect(rate("LCP", 5000)).toBe("poor")
  })

  it("rates CLS", () => {
    expect(rate("CLS", 0.05)).toBe("good")
    expect(rate("CLS", 0.2)).toBe("needs-improvement")
    expect(rate("CLS", 0.5)).toBe("poor")
  })
})
