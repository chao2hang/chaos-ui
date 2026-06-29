import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Combobox } from "./combobox"

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular", disabled: true },
]

describe("Combobox", () => {
  it("renders with placeholder", () => {
    const { container } = render(<Combobox options={options} placeholder="选择框架" />)
    expect(container.textContent).toContain("选择框架")
  })

  it("renders selected value label", () => {
    const { container } = render(<Combobox options={options} value="react" />)
    expect(container.textContent).toContain("React")
  })

  it("renders with custom className", () => {
    const { container } = render(<Combobox options={options} className="custom-combobox" />)
    const btn = container.querySelector('[role="combobox"]')
    expect(btn?.className).toContain("custom-combobox")
  })

  it("renders disabled state", () => {
    const { container } = render(<Combobox options={options} disabled />)
    const btn = container.querySelector('[role="combobox"]')
    expect(btn).toBeDisabled()
  })
})
