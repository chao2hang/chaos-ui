import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MetricTrend, Sparkline } from "./metric-trend"

describe("MetricTrend", () => {
  it("renders label and value", () => {
    render(<MetricTrend label="用户" value={1234} />)
    expect(screen.getByText("用户")).toBeInTheDocument()
    expect(screen.getByText("1,234")).toBeInTheDocument()
  })

  it("renders percent format", () => {
    render(<MetricTrend label="比率" value={0.42} format="percent" />)
    expect(screen.getByText("42%")).toBeInTheDocument()
  })

  it("renders currency format", () => {
    render(<MetricTrend label="收入" value={1000} format="currency" />)
    const text = screen.getByText(/[\u00a5￥$]/)
    expect(text).toBeInTheDocument()
  })

  it("applies data-slot attribute", () => {
    const { container } = render(<MetricTrend label="x" value={1} />)
    expect(container.querySelector('[data-slot="metric-trend"]')).toBeInTheDocument()
  })

  it("shows loading state with skeleton", () => {
    const { container } = render(<MetricTrend label="x" value={0} loading />)
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument()
  })
})

describe("Sparkline", () => {
  it("renders svg with polyline points", () => {
    const { container } = render(<Sparkline data={[1, 2, 3]} />)
    expect(container.querySelector("svg polyline")).toBeInTheDocument()
  })

  it("renders nothing when data is empty", () => {
    const { container } = render(<Sparkline data={[]} />)
    expect(container.querySelector("svg")).toBeNull()
  })
})
