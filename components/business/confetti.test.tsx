import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Confetti } from "./confetti"

describe("Confetti", () => {
  it("renders nothing when inactive", () => {
    const { container } = render(<Confetti active={false} />)
    expect(container.querySelector('[data-slot="confetti"]')).toBeNull()
  })

  it("renders confetti container when active", () => {
    const { container } = render(<Confetti active={true} count={10} />)
    const wrapper = container.querySelector('[data-slot="confetti"]')
    expect(wrapper).toBeInTheDocument()
  })

  it("renders the configured number of pieces", () => {
    const { container } = render(<Confetti active={true} count={12} />)
    const pieces = container.querySelectorAll('[data-slot="confetti"] > span')
    expect(pieces.length).toBe(12)
  })

  it("applies custom className", () => {
    const { container } = render(
      <Confetti active={true} count={4} className="my-confetti" />,
    )
    const wrapper = container.querySelector('[data-slot="confetti"]')
    expect(wrapper?.className).toContain("my-confetti")
  })
})
