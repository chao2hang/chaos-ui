import { describe, it, expect, vi } from "vitest"
import { render, fireEvent, screen } from "@testing-library/react"
import { OTPField, OTPFieldSeparator } from "@/components/ui/otp-field"

describe("OTPField", () => {
  it("renders the requested number of input cells", () => {
    const { container } = render(<OTPField length={4} />)
    const root = container.querySelector('[data-slot="otp-field"]')
    expect(root).toBeTruthy()
    const inputs = root?.querySelectorAll('[data-slot="otp-field-input"]')
    expect(inputs).toHaveLength(4)
  })

  it("calls onValueChange with the new value when typing", () => {
    const onValueChange = vi.fn()
    render(<OTPField length={3} onValueChange={onValueChange} />)
    const firstInput = screen.getAllByRole("textbox")[0] as HTMLInputElement
    fireEvent.input(firstInput, { target: { value: "1" } })
    expect(onValueChange).toHaveBeenCalled()
    const lastCall = onValueChange.mock.calls[onValueChange.mock.calls.length - 1][0] as string
    expect(lastCall).toContain("1")
  })

  it("respects the controlled value prop", () => {
    const { container } = render(<OTPField length={3} value="42" onValueChange={() => {}} />)
    const inputs = container.querySelectorAll('[data-slot="otp-field-input"]') as NodeListOf<HTMLInputElement>
    expect(inputs[0].value).toBe("4")
    expect(inputs[1].value).toBe("2")
    expect(inputs[2].value).toBe("")
  })

  it("renders the separator with the otp-field-separator slot", () => {
    const { container } = render(<OTPFieldSeparator />)
    expect(container.querySelector('[data-slot="otp-field-separator"]')).toBeTruthy()
  })

  it("applies custom className to the root and inputs", () => {
    const { container } = render(
      <OTPField length={2} className="custom-root" inputClassName="custom-input" />,
    )
    const root = container.querySelector('[data-slot="otp-field"]') as HTMLElement
    expect(root.className).toContain("custom-root")
    const input = container.querySelector('[data-slot="otp-field-input"]') as HTMLElement
    expect(input.className).toContain("custom-input")
  })
})
