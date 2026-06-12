import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { AnimatedNumber } from "./animated-number"

describe("AnimatedNumber", () => {
  it("renders the value as text", () => {
    const { container } = render(<AnimatedNumber value={100} duration={0} />)
    const node = container.querySelector('[data-slot="animated-number"]')
    expect(node?.textContent).toContain("100")
  })

  it("applies prefix and suffix", () => {
    const { container } = render(
      <AnimatedNumber value={50} duration={0} prefix="¥" suffix="元" />,
    )
    const node = container.querySelector('[data-slot="animated-number"]')
    expect(node?.textContent).toContain("¥")
    expect(node?.textContent).toContain("元")
  })

  it("respects decimals prop", () => {
    const { container } = render(
      <AnimatedNumber value={3.14159} duration={0} decimals={2} />,
    )
    const node = container.querySelector('[data-slot="animated-number"]')
    expect(node?.textContent).toMatch(/3\.14/)
  })

  it("uses custom formatter when provided", () => {
    const { container } = render(
      <AnimatedNumber
        value={1000}
        duration={0}
        format={(v) => `[${v.toFixed(0)}]`}
      />,
    )
    const node = container.querySelector('[data-slot="animated-number"]')
    expect(node?.textContent).toContain("[")
    expect(node?.textContent).toContain("]")
  })

  it("applies custom className", () => {
    const { container } = render(
      <AnimatedNumber value={1} duration={0} className="custom-num" />,
    )
    const node = container.querySelector('[data-slot="animated-number"]')
    expect(node?.className).toContain("custom-num")
  })
})
