import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { TimePicker } from "./time-picker"

describe("TimePicker", () => {
  it("renders with placeholder", () => {
    const { container } = render(<TimePicker placeholder="选择时间" />)
    expect(container.textContent).toContain("选择时间")
  })

  it("renders with value", () => {
    const { container } = render(<TimePicker value="14:30" />)
    expect(container.textContent).toContain("14:30")
  })

  it("renders with custom className", () => {
    const { container } = render(<TimePicker className="custom-tp" />)
    const btn = container.querySelector("button")
    expect(btn?.className).toContain("custom-tp")
  })

  it("renders disabled state", () => {
    const { container } = render(<TimePicker disabled />)
    const btn = container.querySelector("button")
    expect(btn).toBeDisabled()
  })
})
