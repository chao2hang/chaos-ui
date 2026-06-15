import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { MultiSelect } from "./multi-select"

const options = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "功能" },
  { value: "docs", label: "文档" },
]

describe("MultiSelect", () => {
  it("renders with placeholder", () => {
    const { container } = render(<MultiSelect options={options} placeholder="选择标签" />)
    expect(container.textContent).toContain("选择标签")
  })

  it("renders selected badges", () => {
    const { container } = render(<MultiSelect options={options} value={["bug", "feature"]} />)
    expect(container.textContent).toContain("Bug")
    expect(container.textContent).toContain("功能")
  })

  it("renders overflow count when exceeding maxCount", () => {
    const { container } = render(
      <MultiSelect options={options} value={["bug", "feature", "docs"]} maxCount={2} />,
    )
    expect(container.textContent).toContain("+1")
  })

  it("renders with custom className", () => {
    const { container } = render(<MultiSelect options={options} className="custom-ms" />)
    const btn = container.querySelector("button")
    expect(btn?.className).toContain("custom-ms")
  })
})
