import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useOnlineStatus, useConnectionType } from "./use-online-status"

describe("useOnlineStatus", () => {
  beforeEach(() => {
    Object.defineProperty(navigator, "onLine", { value: true, configurable: true })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("returns true when navigator is online", () => {
    const { result } = renderHook(() => useOnlineStatus())
    expect(result.current).toBe(true)
  })

  it("updates when going offline", () => {
    const { result } = renderHook(() => useOnlineStatus())
    expect(result.current).toBe(true)
    act(() => {
      window.dispatchEvent(new Event("offline"))
    })
    expect(result.current).toBe(false)
  })

  it("updates when going online", () => {
    Object.defineProperty(navigator, "onLine", { value: false, configurable: true })
    const { result } = renderHook(() => useOnlineStatus())
    expect(result.current).toBe(false)
    act(() => {
      window.dispatchEvent(new Event("online"))
    })
    expect(result.current).toBe(true)
  })

  it("cleans up listeners on unmount", () => {
    const addSpy = vi.spyOn(window, "addEventListener")
    const removeSpy = vi.spyOn(window, "removeEventListener")
    const { unmount } = renderHook(() => useOnlineStatus())
    unmount()
    expect(removeSpy).toHaveBeenCalledWith("online", expect.any(Function))
    expect(removeSpy).toHaveBeenCalledWith("offline", expect.any(Function))
    addSpy.mockRestore()
    removeSpy.mockRestore()
  })
})

describe("useConnectionType", () => {
  it("returns null when no connection info available", () => {
    const { result } = renderHook(() => useConnectionType())
    expect(result.current).toBeNull()
  })
})
