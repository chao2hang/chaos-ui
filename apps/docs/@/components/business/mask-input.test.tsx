import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { MaskInput } from "./mask-input"

describe("MaskInput", () => {
  it("renders an input element", () => {
    render(<MaskInput mask="(999) 999-9999" value="" onChange={() => {}} />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("calls onChange when typing", () => {
    const handleChange = vi.fn()
    render(<MaskInput mask="(999) 999-9999" value="" onChange={handleChange} />)
    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "1" } })
    expect(handleChange).toHaveBeenCalled()
  })

  it("is disabled when disabled prop is true", () => {
    render(
      <MaskInput mask="(999) 999-9999" value="" onChange={() => {}} disabled />,
    )
    expect(screen.getByRole("textbox")).toBeDisabled()
  })

  it("applies custom className", () => {
    const { container } = render(
      <MaskInput
        mask="(999) 999-9999"
        value=""
        onChange={() => {}}
        className="custom-mask"
      />,
    )
    expect(container.querySelector(".custom-mask")).toBeInTheDocument()
  })
})
