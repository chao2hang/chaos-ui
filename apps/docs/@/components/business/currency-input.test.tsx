import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { CurrencyInput } from "./currency-input"

describe("CurrencyInput", () => {
  it("renders an input element", () => {
    render(<CurrencyInput value={undefined} onChange={() => {}} />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("displays formatted currency value when not focused", () => {
    render(<CurrencyInput value={1234.56} onChange={() => {}} />)
    const input = screen.getByRole("textbox") as HTMLInputElement
    expect(input.value).toContain("1,234.56")
  })

  it("calls onChange with parsed number", () => {
    const handleChange = vi.fn()
    render(<CurrencyInput value={undefined} onChange={handleChange} />)
    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "500" } })
    expect(handleChange).toHaveBeenCalledWith(500)
  })

  it("is disabled when disabled prop is true", () => {
    render(<CurrencyInput value={100} onChange={() => {}} disabled />)
    expect(screen.getByRole("textbox")).toBeDisabled()
  })
})
