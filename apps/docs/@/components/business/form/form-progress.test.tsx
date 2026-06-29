import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FormProgress } from "./form-progress"

describe("FormProgress", () => {
  it("renders bar variant with percentage", () => {
    render(<FormProgress current={2} total={4} variant="bar" />)
    expect(screen.getByText("50%")).toBeInTheDocument()
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "2")
  })

  it("renders steps variant with current step", () => {
    const { container } = render(<FormProgress current={2} total={3} variant="steps" />)
    const active = container.querySelectorAll('[data-slot="form-progress"] li')
    expect(active.length).toBeGreaterThan(0)
  })

  it("renders dots variant", () => {
    const { container } = render(<FormProgress current={2} total={5} variant="dots" />)
    expect(container.querySelectorAll('[data-slot="form-progress"] > span').length).toBe(5)
  })

  it("clamps to 0-100%", () => {
    render(<FormProgress current={10} total={2} variant="bar" />)
    expect(screen.getByText("100%")).toBeInTheDocument()
  })

  it("uses custom labels", () => {
    render(<FormProgress current={1} total={3} labels={["开始", "中间", "结束"]} />)
    expect(screen.getByText("开始")).toBeInTheDocument()
  })
})
