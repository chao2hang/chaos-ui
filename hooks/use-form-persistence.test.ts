import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useFormPersistence } from "./use-form-persistence"

describe("useFormPersistence", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    window.localStorage.clear()
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it("writes to localStorage after throttle", () => {
    renderHook(() =>
      useFormPersistence({ key: "form1", value: { name: "x" }, throttle: 100 })
    )
    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(window.localStorage.getItem("form-persistence:form1")).toBe(
      JSON.stringify({ name: "x" })
    )
  })

  it("hasDraft true after save", () => {
    const { result } = renderHook(() =>
      useFormPersistence({ key: "form2", value: { x: 1 }, throttle: 50 })
    )
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(result.current.hasDraft).toBe(true)
  })

  it("load returns saved value", () => {
    window.localStorage.setItem("form-persistence:form3", JSON.stringify({ a: 1 }))
    const { result } = renderHook(() =>
      useFormPersistence({ key: "form3", value: { a: 0 }, enabled: false })
    )
    expect(result.current.load()).toEqual({ a: 1 })
  })

  it("clear removes storage and sets hasDraft false", () => {
    window.localStorage.setItem("form-persistence:form4", JSON.stringify({ a: 1 }))
    const { result } = renderHook(() => useFormPersistence({ key: "form4", value: { a: 1 } }))
    act(() => {
      result.current.clear()
    })
    expect(result.current.hasDraft).toBe(false)
    expect(window.localStorage.getItem("form-persistence:form4")).toBeNull()
  })

  it("does not write when disabled", () => {
    renderHook(() =>
      useFormPersistence({ key: "form5", value: { x: 1 }, enabled: false, throttle: 50 })
    )
    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(window.localStorage.getItem("form-persistence:form5")).toBeNull()
  })
})
