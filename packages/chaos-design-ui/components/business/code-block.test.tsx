import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { CodeBlock } from "./code-block"

describe("CodeBlock", () => {
  it("renders code content", () => {
    const { container } = render(<CodeBlock code='console.log("hi")' language="js" />)
    expect(container.textContent).toContain("console.log")
  })

  it("renders filename and language", () => {
    const { container } = render(<CodeBlock code="const x = 1" filename="test.ts" language="ts" />)
    expect(container.textContent).toContain("test.ts")
    expect(container.textContent).toContain("ts")
  })

  it("renders with custom className", () => {
    const { container } = render(<CodeBlock code="x" className="custom-cb" />)
    expect(container.querySelector('[data-slot="code-block"]')?.className).toContain("custom-cb")
  })

  it("hides line numbers when disabled", () => {
    const { container } = render(<CodeBlock code="line1\nline2" showLineNumbers={false} />)
    expect(container.querySelector("table")).toBeFalsy()
  })
})
