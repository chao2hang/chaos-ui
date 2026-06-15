import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Chip } from "./chip"

describe("Chip", () => {
  it("renders children", () => {
    render(<Chip>标签</Chip>)
    expect(screen.getByText("标签")).toBeInTheDocument()
  })

  it("applies variant data attribute", () => {
    const { container } = render(<Chip variant="success">S</Chip>)
    const node = container.querySelector('[data-slot="chip"]')
    expect(node?.getAttribute("data-variant")).toBe("success")
  })

  it("does not show remove button by default", () => {
    const { container } = render(<Chip>标签</Chip>)
    expect(
      container.querySelector('button[aria-label="移除"]'),
    ).not.toBeInTheDocument()
  })

  it("shows remove button when removable and triggers onRemove", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    const { container } = render(
      <Chip removable onRemove={handle}>
        标签
      </Chip>,
    )
    const button = container.querySelector(
      'button[aria-label="移除"]',
    ) as HTMLButtonElement
    expect(button).toBeInTheDocument()
    await user.click(button)
    expect(handle).toHaveBeenCalledTimes(1)
  })

  it("applies custom className", () => {
    const { container } = render(<Chip className="custom-chip">X</Chip>)
    const node = container.querySelector('[data-slot="chip"]')
    expect(node?.className).toContain("custom-chip")
  })
})
