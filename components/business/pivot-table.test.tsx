import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { PivotTable } from "./pivot-table"

const data = [
  { region: "华东", quarter: "Q1", amount: 100 },
  { region: "华东", quarter: "Q2", amount: 200 },
  { region: "华北", quarter: "Q1", amount: 150 },
]

describe("PivotTable", () => {
  it("renders table", () => {
    const { container } = render(
      <PivotTable data={data} rowField="region" columnField="quarter" valueField="amount" />,
    )
    expect(container.querySelector("table")).toBeTruthy()
  })

  it("renders row and column headers", () => {
    const { container } = render(
      <PivotTable data={data} rowField="region" columnField="quarter" valueField="amount" />,
    )
    expect(container.textContent).toContain("华东")
    expect(container.textContent).toContain("华北")
    expect(container.textContent).toContain("Q1")
  })

  it("renders with custom className", () => {
    const { container } = render(
      <PivotTable data={data} rowField="region" columnField="quarter" valueField="amount" className="custom-pt" />,
    )
    expect(container.querySelector('[data-slot="pivot-table"]')?.className).toContain("custom-pt")
  })
})
