import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useFormAutosave } from "./use-form-autosave"

describe("useFormAutosave", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it("starts in idle state", () => {
    const onSave = vi.fn()
    const { result } = renderHook(() => useFormAutosave({ value: "a", onSave }))
    expect(result.current.status).toBe("idle")
  })

  it("does not save when disabled", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined)
    renderHook(({ value }) => useFormAutosave({ value, onSave, enabled: false }), {
      initialProps: { value: "a" },
    })
    await act(async () => {
      vi.advanceTimersByTime(1000)
    })
    expect(onSave).not.toHaveBeenCalled()
  })

  it("saves after debounce when value changes", { timeout: 15000 }, async () => {
    const onSave = vi.fn().mockResolvedValue(undefined)
    const { rerender } = renderHook(
      ({ value }) => useFormAutosave({ value, onSave, delay: 200 }),
      { initialProps: { value: "a" } }
    )
    rerender({ value: "b" })
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300)
    })
    expect(onSave).toHaveBeenCalledWith("b")
  })

  it("does not save when value unchanged", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined)
    renderHook(() => useFormAutosave({ value: "same", onSave, delay: 100 }))
    await act(async () => {
      vi.advanceTimersByTime(500)
    })
    expect(onSave).not.toHaveBeenCalled()
  })

  it("captures save errors via manual save", { timeout: 15000 }, async () => {
    const err = new Error("boom")
    const onSave = vi.fn().mockRejectedValue(err)
    const { result } = renderHook(() => useFormAutosave({ value: "a", onSave, delay: 50 }))
    await act(async () => {
      try {
        await result.current.save()
      } catch {
        // expected
      }
    })
    expect(onSave).toHaveBeenCalledWith("a")
    expect(result.current.status).toBe("error")
    expect(result.current.error).toBe(err)
  })

  it("reset restores idle", () => {
    const onSave = vi.fn()
    const { result } = renderHook(() => useFormAutosave({ value: "a", onSave }))
    act(() => {
      result.current.reset()
    })
    expect(result.current.status).toBe("idle")
  })

  it("manual save invokes handler", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined)
    const { result } = renderHook(() => useFormAutosave({ value: "a", onSave }))
    await act(async () => {
      await result.current.save()
    })
    expect(onSave).toHaveBeenCalledWith("a")
  })
})
