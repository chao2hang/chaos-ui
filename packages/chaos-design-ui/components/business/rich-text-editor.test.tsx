import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { RichTextEditor } from "./rich-text-editor"

describe("RichTextEditor", () => {
  it("renders editor container", () => {
    const { container } = render(<RichTextEditor />)
    expect(container.querySelector('[data-slot="rich-text-editor"]')).toBeTruthy()
  })

  it("renders with custom className", () => {
    const { container } = render(<RichTextEditor className="custom-rte" />)
    expect(container.querySelector('[data-slot="rich-text-editor"]')?.className).toContain("custom-rte")
  })

  it("renders loading state initially", () => {
    const { container } = render(<RichTextEditor />)
    expect(container.textContent).toBeTruthy()
  })
})
