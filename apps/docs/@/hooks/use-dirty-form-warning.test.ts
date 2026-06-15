import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useDirtyFormWarning } from "./use-dirty-form-warning"

describe("useDirtyFormWarning", () => {
  beforeEach(() => {
    vi.spyOn(window, "addEventListener")
    vi.spyOn(window, "removeEventListener")
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("does nothing when not dirty", () => {
    renderHook(() => useDirtyFormWarning(false))
    expect(window.addEventListener).toHaveBeenCalledWith("beforeunload", expect.any(Function))
  })

  it("registers beforeunload handler", () => {
    renderHook(() => useDirtyFormWarning(true))
    expect(window.addEventListener).toHaveBeenCalledWith("beforeunload", expect.any(Function))
  })

  it("removes handler on unmount", () => {
    const { unmount } = renderHook(() => useDirtyFormWarning(true))
    unmount()
    expect(window.removeEventListener).toHaveBeenCalledWith("beforeunload", expect.any(Function))
  })

  it("confirmLeave returns true when not dirty", () => {
    const { result } = renderHook(() => useDirtyFormWarning(false))
    expect(result.current.confirmLeave()).toBe(true)
  })

  it("confirmLeave prompts when dirty", () => {
    const spy = vi.spyOn(window, "confirm").mockReturnValue(false)
    const { result } = renderHook(() => useDirtyFormWarning(true))
    expect(result.current.confirmLeave()).toBe(false)
    expect(spy).toHaveBeenCalled()
  })

  it("confirmLeave returns false when onAttemptLeave returns false", () => {
    const onAttemptLeave = vi.fn(() => false)
    const { result } = renderHook(() =>
      useDirtyFormWarning(true, { onAttemptLeave })
    )
    expect(result.current.confirmLeave()).toBe(false)
    expect(onAttemptLeave).toHaveBeenCalled()
  })

  it("beforeunload handler sets returnValue when dirty", () => {
    renderHook(() => useDirtyFormWarning(true, { message: "Custom?" }))
    const ev = new Event("beforeunload") as BeforeUnloadEvent
    let prevented = false
    Object.defineProperty(ev, "preventDefault", {
      value: () => { prevented = true },
    })
    Object.defineProperty(ev, "returnValue", { value: "", writable: true })
    window.dispatchEvent(ev)
    expect(prevented || ev.returnValue === "Custom?").toBe(true)
  })
})
