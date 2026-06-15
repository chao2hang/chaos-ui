import { describe, it, expect, vi, beforeEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { useAsyncField } from "./use-async-field"

describe("useAsyncField", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("fetches data and sets it", async () => {
    const fetcher = vi.fn().mockResolvedValue({ id: 1 })
    const { result } = renderHook(() =>
      useAsyncField("q1", { fetcher, debounce: 0, enabled: true })
    )
    await waitFor(() => expect(result.current.data).toEqual({ id: 1 }))
    expect(fetcher).toHaveBeenCalled()
  })

  it("sets loading true while fetching", async () => {
    let resolve: (v: unknown) => void = () => {}
    const fetcher = vi.fn().mockImplementation(
      () => new Promise<unknown>((r) => { resolve = r })
    )
    const { result } = renderHook(() =>
      useAsyncField("q2", { fetcher, debounce: 0 })
    )
    expect(result.current.loading).toBe(true)
    resolve("done")
  })

  it("captures errors", async () => {
    const err = new Error("nope")
    const fetcher = vi.fn().mockRejectedValue(err)
    const { result } = renderHook(() =>
      useAsyncField("q3", { fetcher, debounce: 0 })
    )
    await waitFor(() => expect(result.current.error).toBe(err))
  })

  it("does not fetch when disabled", () => {
    const fetcher = vi.fn()
    renderHook(() => useAsyncField("q4", { fetcher, debounce: 0, enabled: false }))
    expect(fetcher).not.toHaveBeenCalled()
  })
})
