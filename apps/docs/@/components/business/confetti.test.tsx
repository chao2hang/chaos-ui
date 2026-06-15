import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Confetti } from "./confetti"

describe("Confetti", () => {
  it("renders nothing when trigger is 0", () => {
    const { container } = render(<Confetti trigger={0} />)
    expect(container.querySelector('[data-slot="confetti"]')).toBeNull()
  })

  it("renders confetti container when triggered", () => {
    const { container } = render(<Confetti trigger={1} count={10} />)
    const wrapper = container.querySelector('[data-slot="confetti"]')
    expect(wrapper).toBeInTheDocument()
  })

  it("renders the configured number of pieces", () => {
    const { container } = render(<Confetti trigger={1} count={12} />)
    const pieces = container.querySelectorAll('[data-slot="confetti"] > span')
    expect(pieces.length).toBe(12)
  })

  it("remounts particles when trigger increments", () => {
    const { container, rerender } = render(<Confetti trigger={1} count={5} />)
    const firstKey = container.querySelector('[data-slot="confetti"]')?.outerHTML
    rerender(<Confetti trigger={2} count={5} />)
    const secondKey = container.querySelector('[data-slot="confetti"]')?.outerHTML
    expect(firstKey).not.toBe(secondKey)
  })

  it("applies custom className", () => {
    const { container } = render(
      <Confetti trigger={1} count={4} className="my-confetti" />,
    )
    const wrapper = container.querySelector('[data-slot="confetti"]')
    expect(wrapper?.className).toContain("my-confetti")
  })
})
