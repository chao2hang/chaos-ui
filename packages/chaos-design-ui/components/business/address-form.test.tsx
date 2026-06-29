import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AddressForm } from "./address-form"

describe("AddressForm", () => {
  it("renders all address fields", () => {
    render(<AddressForm />)
    expect(screen.getByLabelText(/address line 1/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/address line 2/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/postal code/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument()
  })

  it("shows validation errors on submit with empty fields", async () => {
    const user = userEvent.setup()
    render(<AddressForm />)
    const line1 = screen.getByLabelText(/address line 1/i)
    await user.click(line1)
    await user.tab()
    expect(await screen.findByText(/address line 1 is required/i)).toBeInTheDocument()
  })

  it("pre-fills values when provided", () => {
    render(
      <AddressForm
        value={{
          line1: "123 Main St",
          city: "Springfield",
          postalCode: "62701",
          country: "US",
        }}
      />,
    )
    expect(screen.getByLabelText(/address line 1/i)).toHaveValue("123 Main St")
    expect(screen.getByLabelText(/city/i)).toHaveValue("Springfield")
  })

  it("applies custom className", () => {
    const { container } = render(<AddressForm className="custom-addr" />)
    const el = container.querySelector('[data-slot="address-form"]') as HTMLElement
    expect(el.className).toContain("custom-addr")
  })
})
