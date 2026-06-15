import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { DensitySwitcher } from "./density-switcher"

describe("DensitySwitcher", () => {
  it("renders with custom children", () => {
    render(<DensitySwitcher open>我的密度</DensitySwitcher>)
    expect(screen.getByText("我的密度")).toBeInTheDocument()
  })

  it("has role=switch and reflects state", () => {
    render(<DensitySwitcher open>ON</DensitySwitcher>)
    const btn = screen.getByRole("switch")
    expect(btn.getAttribute("aria-checked")).toBe("true")
  })

  it("fires onChange when toggled", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<DensitySwitcher open={false} onChange={handle}>X</DensitySwitcher>)
    await user.click(screen.getByRole("switch"))
    expect(handle).toHaveBeenCalledWith(true)
  })

  it("applies density data attribute", () => {
    const { container } = render(<DensitySwitcher open density="compact" />)
    const btn = container.querySelector('[role="switch"]')
    expect(btn?.getAttribute("data-density")).toBe("compact")
  })

  it("applies custom className", () => {
    const { container } = render(
      <DensitySwitcher open className="custom-density" />,
    )
    expect(
      container.querySelector('[role="switch"]')?.className,
    ).toContain("custom-density")
  })
})
