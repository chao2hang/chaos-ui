import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { HeatmapCalendar } from "./heatmap-calendar"

const data = [
  { date: "2024-01-01", value: 3 },
  { date: "2024-01-02", value: 7 },
  { date: "2024-01-03", value: 0 },
]

describe("HeatmapCalendar", () => {
  it("renders container", () => {
    const { container } = render(<HeatmapCalendar data={data} />)
    expect(container.querySelector('[data-slot="heatmap-calendar"]')).toBeTruthy()
  })

  it("renders legend by default", () => {
    const { container } = render(<HeatmapCalendar data={data} />)
    expect(container.textContent).toContain("少")
    expect(container.textContent).toContain("多")
  })

  it("hides legend when showLegend is false", () => {
    const { container } = render(<HeatmapCalendar data={data} showLegend={false} />)
    expect(container.textContent).not.toContain("少")
  })

  it("renders with custom className", () => {
    const { container } = render(<HeatmapCalendar data={data} className="custom-hm" />)
    expect(container.querySelector('[data-slot="heatmap-calendar"]')?.className).toContain("custom-hm")
  })
})
