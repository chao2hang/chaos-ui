import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { CreditCardInput, validateCreditCard } from "./credit-card-input"

describe("CreditCardInput", () => {
  it("renders an input element", () => {
    render(<CreditCardInput value="" onChange={() => {}} />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("displays formatted card number with spaces", () => {
    render(<CreditCardInput value="4242424242424242" onChange={() => {}} />)
    const input = screen.getByRole("textbox") as HTMLInputElement
    expect(input.value).toBe("4242 4242 4242 4242")
  })

  it("calls onChange with digits only", () => {
    const handleChange = vi.fn()
    render(<CreditCardInput value="" onChange={handleChange} />)
    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "4242 4242" } })
    expect(handleChange).toHaveBeenCalledWith("42424242")
  })

  it("is disabled when disabled prop is true", () => {
    render(<CreditCardInput value="" onChange={() => {}} disabled />)
    expect(screen.getByRole("textbox")).toBeDisabled()
  })
})

describe("validateCreditCard", () => {
  it("returns true for valid Visa test number", () => {
    expect(validateCreditCard("4242424242424242")).toBe(true)
  })

  it("returns false for invalid number", () => {
    expect(validateCreditCard("1234567890123456")).toBe(false)
  })

  it("returns false for empty string", () => {
    expect(validateCreditCard("")).toBe(false)
  })
})
