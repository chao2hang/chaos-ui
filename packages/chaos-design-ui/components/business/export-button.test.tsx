import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ExportButton } from "./export-button"

describe("ExportButton", () => {
  const data = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]

  it("renders single format as plain button", () => {
    render(<ExportButton data={data} formats={["json"]} />)
    const btn = screen.getByRole("button", { name: /导出/ })
    expect(btn).toBeInTheDocument()
  })

  it("renders dropdown trigger for multiple formats", () => {
    render(<ExportButton data={data} formats={["csv", "json"]} />)
    const trigger = screen.getByRole("button", { name: /导出/ })
    expect(trigger).toBeInTheDocument()
  })

  it("applies custom label", () => {
    render(<ExportButton data={data} formats={["json"]} label="下载报告" />)
    expect(screen.getByText("下载报告")).toBeInTheDocument()
  })

  it("uses custom filename", () => {
    render(<ExportButton data={data} formats={["json"]} filename="my-report" />)
    expect(screen.getByRole("button", { name: /导出/ })).toBeInTheDocument()
  })
})
