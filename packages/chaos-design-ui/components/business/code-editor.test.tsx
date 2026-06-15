import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { CodeEditor } from "./code-editor"

describe("CodeEditor", () => {
  it("renders editor container", () => {
    const { container } = render(<CodeEditor value="const x = 1" />)
    expect(container.querySelector('[data-slot="code-editor"]')).toBeTruthy()
  })

  it("renders filename", () => {
    const { container } = render(<CodeEditor value="" filename="test.ts" />)
    expect(container.textContent).toContain("test.ts")
  })

  it("renders with custom className", () => {
    const { container } = render(<CodeEditor value="" className="custom-ce" />)
    expect(container.querySelector('[data-slot="code-editor"]')?.className).toContain("custom-ce")
  })
})
