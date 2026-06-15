import { describe, it, expect } from "vitest"
import { renderHook } from "@testing-library/react"
import { useDocumentVisibility } from "./use-document-visibility"

describe("useDocumentVisibility", () => {
  it("returns visible initially when document is visible", () => {
    Object.defineProperty(document, "visibilityState", { value: "visible", configurable: true })
    const { result } = renderHook(() => useDocumentVisibility())
    expect(result.current).toBe("visible")
  })

  it("returns hidden when document is hidden", () => {
    Object.defineProperty(document, "visibilityState", { value: "hidden", configurable: true })
    const { result } = renderHook(() => useDocumentVisibility())
    expect(result.current).toBe("hidden")
  })
})
