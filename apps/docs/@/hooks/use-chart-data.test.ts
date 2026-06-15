import { describe, it, expect } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useChartData } from "./use-chart-data"

describe("useChartData", () => {
  it("initializes empty state", () => {
    const { result } = renderHook(() => useChartData())
    expect(result.current.activeSeries.size).toBe(0)
    expect(result.current.hiddenSeries.size).toBe(0)
    expect(result.current.hoveredPoint).toBeNull()
    expect(result.current.hidden).toBe(false)
  })

  it("toggles series in and out", () => {
    const { result } = renderHook(() => useChartData())
    act(() => result.current.toggleSeries("A"))
    act(() => result.current.toggleSeries("A"))
    expect(result.current.hiddenSeries.size).toBe(0)
  })

  it("sets hovered point", () => {
    const { result } = renderHook(() => useChartData())
    act(() => result.current.setHovered({ x: 1, y: 2 }))
    expect(result.current.hoveredPoint).toEqual({ x: 1, y: 2 })
  })

  it("sets hidden flag", () => {
    const { result } = renderHook(() => useChartData())
    act(() => result.current.setHidden(true))
    expect(result.current.hidden).toBe(true)
  })
})
