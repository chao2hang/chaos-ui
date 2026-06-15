import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Gauge, RadialProgress } from "./gauge"

describe("Gauge", () => {
  it("renders meter role and value", () => {
    const { container } = render(<Gauge value={50} />)
    const meter = container.querySelector('[role="meter"]')
    expect(meter).toBeInTheDocument()
    expect(meter?.getAttribute("aria-valuenow")).toBe("50")
  })

  it("clamps the value between min and max", () => {
    const { container } = render(<Gauge value={200} min={0} max={100} />)
    const meter = container.querySelector('[role="meter"]')
    expect(meter?.getAttribute("aria-valuenow")).toBe("100")
  })

  it("renders custom formatValue", () => {
    const { container } = render(
      <Gauge value={50} formatValue={(v) => `${v}KB`} />,
    )
    expect(container.textContent).toContain("50KB")
  })

  it("renders label when provided", () => {
    const { container } = render(<Gauge value={50} label="CPU" />)
    expect(container.textContent).toContain("CPU")
  })
})

describe("RadialProgress", () => {
  it("renders progressbar role with current value", () => {
    const { container } = render(<RadialProgress value={42} />)
    const bar = container.querySelector('[role="progressbar"]')
    expect(bar).toBeInTheDocument()
    expect(bar?.getAttribute("aria-valuenow")).toBe("42")
  })

  it("clamps value 0-100", () => {
    const { container } = render(<RadialProgress value={150} />)
    const bar = container.querySelector('[role="progressbar"]')
    expect(bar?.getAttribute("aria-valuenow")).toBe("100")
  })

  it("hides value when showValue is false", () => {
    const { container } = render(<RadialProgress value={50} showValue={false} />)
    expect(container.textContent?.trim()).toBe("")
  })
})
