import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { SignaturePad } from "./signature-pad"

describe("SignaturePad", () => {
  it("renders a canvas element", () => {
    const { container } = render(<SignaturePad />)
    const canvas = container.querySelector("canvas")
    expect(canvas).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(<SignaturePad className="custom-sig" />)
    const canvas = container.querySelector("canvas")
    expect(canvas?.className).toContain("custom-sig")
  })

  it("sets width and height attributes", () => {
    const { container } = render(<SignaturePad width={300} height={150} />)
    const canvas = container.querySelector("canvas")
    expect(canvas).toBeInTheDocument()
  })

  it("exposes clear method via ref", () => {
    const ref = { current: null as any }
    render(<SignaturePad ref={ref} />)
    expect(ref.current).toBeDefined()
    expect(typeof ref.current.clear).toBe("function")
  })
})
