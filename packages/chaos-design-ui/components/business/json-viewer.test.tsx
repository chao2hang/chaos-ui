import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { JsonViewer } from "./json-viewer"

describe("JsonViewer", () => {
  it("renders JSON data", () => {
    const { container } = render(<JsonViewer data={{ name: "test" }} />)
    expect(container.textContent).toContain("name")
    expect(container.textContent).toContain("test")
  })

  it("renders array data", () => {
    const { container } = render(<JsonViewer data={[1, 2, 3]} />)
    expect(container.textContent).toContain("3")
  })

  it("renders null value", () => {
    const { container } = render(<JsonViewer data={{ key: null }} />)
    expect(container.textContent).toContain("null")
  })

  it("renders with custom className", () => {
    const { container } = render(<JsonViewer data={{}} className="custom-jv" />)
    expect(container.querySelector('[data-slot="json-viewer"]')?.className).toContain("custom-jv")
  })
})
