import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { SearchInput } from "./search-input"

describe("SearchInput", () => {
  it("renders input", () => {
    const { container } = render(<SearchInput />)
    expect(container.querySelector("input")).toBeTruthy()
  })

  it("renders with placeholder", () => {
    const { container } = render(<SearchInput placeholder="搜索内容" />)
    expect(container.querySelector("input")?.getAttribute("placeholder")).toBe("搜索内容")
  })

  it("renders with value", () => {
    const { container } = render(<SearchInput value="test query" />)
    expect(container.querySelector("input")?.value).toBe("test query")
  })

  it("renders with custom className", () => {
    const { container } = render(<SearchInput className="custom-si" />)
    expect(container.querySelector('[data-slot="search-input"]')?.className).toContain("custom-si")
  })
})
