import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { BarcodeDisplay } from "./barcode-display"

const mockJsBarcode = vi.fn()

vi.mock("jsbarcode", () => ({
  default: (...args: any[]) => mockJsBarcode(...args),
}))

describe("BarcodeDisplay", () => {
  beforeEach(() => {
    mockJsBarcode.mockClear()
  })

  it("renders a canvas when value is provided", () => {
    const { container } = render(<BarcodeDisplay value="123456" />)
    expect(container.querySelector("canvas")).toBeTruthy()
  })

  it("renders nothing when value is empty", () => {
    const { container } = render(<BarcodeDisplay value="" />)
    expect(container.querySelector('[data-slot="barcode-display"]')).toBeFalsy()
  })

  it("applies custom className", () => {
    const { container } = render(<BarcodeDisplay value="123" className="custom-bar" />)
    const el = container.querySelector('[data-slot="barcode-display"]') as HTMLElement
    expect(el.className).toContain("custom-bar")
  })

  it("calls JsBarcode with correct format", () => {
    render(<BarcodeDisplay value="5901234123457" format="EAN13" />)
    expect(mockJsBarcode).toHaveBeenCalledWith(
      expect.anything(),
      "5901234123457",
      expect.objectContaining({ format: "EAN13" }),
    )
  })
})
