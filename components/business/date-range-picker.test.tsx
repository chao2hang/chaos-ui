import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { DateRangePicker } from "./date-range-picker"

describe("DateRangePicker", () => {
  it("renders with placeholder", () => {
    const { container } = render(<DateRangePicker placeholder="选择日期" />)
    expect(container.textContent).toContain("选择日期")
  })

  it("renders with custom className", () => {
    const { container } = render(<DateRangePicker className="custom-drp" />)
    const btn = container.querySelector("button")
    expect(btn?.className).toContain("custom-drp")
  })

  it("renders disabled state", () => {
    const { container } = render(<DateRangePicker disabled />)
    const btn = container.querySelector("button")
    expect(btn).toBeDisabled()
  })
})
