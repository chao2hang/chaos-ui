import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Watermark } from "./watermark"

describe("Watermark", () => {
  it("renders watermark element with default text", () => {
    const { container } = render(
      <div>
        <Watermark text="测试水印" />
      </div>,
    )
    const el = container.querySelector('[data-slot="watermark"]')
    expect(el).toBeInTheDocument()
    expect(container.textContent).toContain("测试水印")
  })

  it("renders container-only mode (fullPage=false)", () => {
    const { container } = render(
      <div style={{ position: "relative", width: 200, height: 200 }}>
        <Watermark text="X" fullPage={false} />
      </div>,
    )
    const el = container.querySelector('[data-slot="watermark"]')
    expect(el).toBeInTheDocument()
    expect(el?.className).toContain("absolute")
  })

  it("applies custom opacity via inline style", () => {
    const { container } = render(
      <Watermark text="X" opacity={0.5} fullPage={false} />,
    )
    const span = container.querySelector("span")
    expect(span?.style.opacity).toBe("0.5")
  })

  it("applies custom className", () => {
    const { container } = render(
      <div>
        <Watermark text="X" className="custom-watermark" />
      </div>,
    )
    const el = container.querySelector('[data-slot="watermark"]')
    expect(el?.className).toContain("custom-watermark")
  })
})
