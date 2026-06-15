import { describe, it, expect } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useFormFieldArray } from "./use-form-field-array"

describe("useFormFieldArray", () => {
  it("starts with defaultValue", () => {
    const { result } = renderHook(() =>
      useFormFieldArray<string>({ defaultValue: ["a", "b"] })
    )
    expect(result.current.items).toEqual(["a", "b"])
  })

  it("appends items", () => {
    const { result } = renderHook(() => useFormFieldArray<string>())
    act(() => {
      result.current.append("x")
    })
    expect(result.current.items).toEqual(["x"])
  })

  it("respects max when appending", () => {
    const { result } = renderHook(() => useFormFieldArray<string>({ max: 1 }))
    act(() => result.current.append("a"))
    act(() => result.current.append("b"))
    expect(result.current.items).toEqual(["a"])
    expect(result.current.canAdd).toBe(false)
  })

  it("removes items", () => {
    const { result } = renderHook(() => useFormFieldArray<string>({ defaultValue: ["a", "b"] }))
    act(() => result.current.remove(0))
    expect(result.current.items).toEqual(["b"])
  })

  it("respects min when removing", () => {
    const { result } = renderHook(() => useFormFieldArray<string>({ defaultValue: ["only"], min: 1 }))
    act(() => result.current.remove(0))
    expect(result.current.items).toEqual(["only"])
    expect(result.current.canRemove).toBe(false)
  })

  it("swaps items", () => {
    const { result } = renderHook(() => useFormFieldArray<string>({ defaultValue: ["a", "b", "c"] }))
    act(() => result.current.swap(0, 2))
    expect(result.current.items).toEqual(["c", "b", "a"])
  })

  it("updates item", () => {
    const { result } = renderHook(() => useFormFieldArray<string>({ defaultValue: ["a"] }))
    act(() => result.current.update(0, "z"))
    expect(result.current.items).toEqual(["z"])
  })

  it("resets to defaultValue", () => {
    const { result } = renderHook(() => useFormFieldArray<string>({ defaultValue: ["x"] }))
    act(() => result.current.append("y"))
    act(() => result.current.reset())
    expect(result.current.items).toEqual(["x"])
  })

  it("reset to custom value", () => {
    const { result } = renderHook(() => useFormFieldArray<string>())
    act(() => result.current.reset(["p", "q"]))
    expect(result.current.items).toEqual(["p", "q"])
  })
})
