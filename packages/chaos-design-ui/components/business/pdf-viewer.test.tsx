import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { PDFViewer } from "./pdf-viewer"

describe("PDFViewer", () => {
  it("renders with src", () => {
    const { container } = render(<PDFViewer src="https://example.com/test.pdf" />)
    expect(container.querySelector('[data-slot="pdf-viewer"]')).toBeTruthy()
  })

  it("renders title", () => {
    const { container } = render(<PDFViewer src="https://example.com/test.pdf" title="测试文档" />)
    expect(container.textContent).toContain("测试文档")
  })

  it("renders with custom className", () => {
    const { container } = render(<PDFViewer src="https://example.com/test.pdf" className="custom-pdf" />)
    expect(container.querySelector('[data-slot="pdf-viewer"]')?.className).toContain("custom-pdf")
  })
})
