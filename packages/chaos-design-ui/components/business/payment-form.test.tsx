import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { PaymentForm } from "./payment-form"

describe("PaymentForm", () => {
  it("renders all payment fields", () => {
    render(<PaymentForm />)
    expect(screen.getByLabelText(/card number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cardholder name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/month/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/year/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument()
  })

  it("shows validation error for invalid card number", async () => {
    const user = userEvent.setup()
    render(<PaymentForm />)
    const cardInput = screen.getByLabelText(/card number/i)
    await user.type(cardInput, "1234567890123456")
    await user.tab()
    expect(await screen.findByText(/invalid card number/i)).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(<PaymentForm className="custom-pay" />)
    const el = container.querySelector('[data-slot="payment-form"]') as HTMLElement
    expect(el.className).toContain("custom-pay")
  })

  it("renders a submit button", () => {
    render(<PaymentForm />)
    expect(screen.getByRole("button", { name: /submit payment/i })).toBeInTheDocument()
  })
})
