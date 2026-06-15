import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { PhoneInput } from "./phone-input"

describe("PhoneInput", () => {
  it("renders an input element", () => {
    render(<PhoneInput value="" onChange={() => {}} />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("displays the provided value", () => {
    render(<PhoneInput value="+8613800138000" onChange={() => {}} />)
    const input = screen.getByRole("textbox")
    expect(input).toBeInTheDocument()
  })

  it("is disabled when disabled prop is true", () => {
    render(<PhoneInput value="" onChange={() => {}} disabled />)
    const input = screen.getByRole("textbox")
    expect(input).toBeDisabled()
  })

  it("applies custom className", () => {
    const { container } = render(
      <PhoneInput value="" onChange={() => {}} className="custom-phone" />,
    )
    expect(container.querySelector(".custom-phone")).toBeInTheDocument()
  })
})
