import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { DashboardDesigner } from "./dashboard-designer"
import type { DashboardConfig } from "./dashboard-designer"

const sampleConfig: DashboardConfig = {
  widgets: [
    { id: "w1", type: "kpi", title: "Revenue", x: 0, y: 0, w: 3, h: 2, config: { value: "$100K", unit: "MTD" } },
    { id: "w2", type: "chart-bar", title: "Sales Trend", x: 3, y: 0, w: 6, h: 4, config: { chartType: "bar" } },
    { id: "w3", type: "table", title: "Orders", x: 0, y: 4, w: 6, h: 4, config: { columnCount: 4 } },
  ],
  filters: [],
}

describe("DashboardDesigner", () => {
  it("renders toolbar with buttons", () => {
    render(<DashboardDesigner />)
    expect(screen.getByTestId("undo-button")).toBeInTheDocument()
    expect(screen.getByTestId("redo-button")).toBeInTheDocument()
    expect(screen.getByTestId("add-widget-button")).toBeInTheDocument()
  })

  it("canvas renders widgets at correct positions", () => {
    const { container } = render(<DashboardDesigner config={sampleConfig} />)
    const w1 = container.querySelector('[data-widget-id="w1"]')
    expect(w1).toBeInTheDocument()
    expect(w1?.getAttribute("data-widget-type")).toBe("kpi")

    const w2 = container.querySelector('[data-widget-id="w2"]')
    expect(w2).toBeInTheDocument()
    expect(w2?.getAttribute("data-widget-type")).toBe("chart-bar")
  })

  it("add widget from catalog", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DashboardDesigner onChange={onChange} />)

    // Open dropdown
    await user.click(screen.getByTestId("add-widget-button"))

    // Click a widget type (portal-rendered, use findBy)
    const menuItem = await screen.findByTestId("catalog-kpi")
    await user.click(menuItem)

    expect(onChange).toHaveBeenCalledTimes(1)
    const newConfig = onChange.mock.calls[0]![0]! as DashboardConfig
    expect(newConfig.widgets).toHaveLength(1)
    expect(newConfig.widgets[0]!.type).toBe("kpi")
  })

  it("select widget opens property panel", async () => {
    const user = userEvent.setup()
    render(<DashboardDesigner config={sampleConfig} />)

    const widget = screen.getByTestId("delete-widget-w1").closest('[data-slot="dashboard-designer-widget"]')
    await user.click(widget!)

    // Sheet should be open with property fields
    expect(await screen.findByTestId("property-title")).toBeInTheDocument()
  })

  it("edit widget title", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DashboardDesigner config={sampleConfig} onChange={onChange} />)

    // Select widget
    const widget = screen.getByTestId("delete-widget-w1").closest('[data-slot="dashboard-designer-widget"]')
    await user.click(widget!)

    // Edit title
    const titleInput = await screen.findByTestId("property-title") as HTMLInputElement
    await user.clear(titleInput)
    await user.type(titleInput, "New Revenue")
    expect(onChange).toHaveBeenCalled()
  })

  it("edit widget position/size", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DashboardDesigner config={sampleConfig} onChange={onChange} />)

    const widget = screen.getByTestId("delete-widget-w1").closest('[data-slot="dashboard-designer-widget"]')
    await user.click(widget!)

    const xInput = await screen.findByTestId("property-x") as HTMLInputElement
    await user.clear(xInput)
    await user.type(xInput, "2")
    expect(onChange).toHaveBeenCalled()
  })

  it("delete widget", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DashboardDesigner config={sampleConfig} onChange={onChange} />)

    await user.click(screen.getByTestId("delete-widget-w1"))
    expect(onChange).toHaveBeenCalledTimes(1)
    const newConfig = onChange.mock.calls[0]![0]! as DashboardConfig
    expect(newConfig.widgets).toHaveLength(2)
    expect(newConfig.widgets.find((w: any) => w.id === "w1")).toBeUndefined()
  })

  it("undo reverses add", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DashboardDesigner config={{ widgets: [], filters: [] }} onChange={onChange} />)

    // Add widget
    await user.click(screen.getByTestId("add-widget-button"))
    await user.click(await screen.findByTestId("catalog-kpi"))
    expect(onChange).toHaveBeenCalledTimes(1)

    // Undo
    await user.click(screen.getByTestId("undo-button"))
    expect(onChange).toHaveBeenCalledTimes(2)
    const undoneConfig = onChange.mock.calls[1]![0] as DashboardConfig
    expect(undoneConfig.widgets).toHaveLength(0)
  })

  it("redo re-applies undone action", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DashboardDesigner config={{ widgets: [], filters: [] }} onChange={onChange} />)

    // Add widget
    await user.click(screen.getByTestId("add-widget-button"))
    await user.click(await screen.findByTestId("catalog-kpi"))

    // Undo
    await user.click(screen.getByTestId("undo-button"))

    // Redo
    await user.click(screen.getByTestId("redo-button"))
    // Redo should fire onChange (3 total calls: add, undo, redo)
    expect(onChange).toHaveBeenCalledTimes(3)
    // The undone call should have empty widgets
    const undoneConfig = onChange.mock.calls[1]![0] as DashboardConfig
    expect(undoneConfig.widgets).toHaveLength(0)
  })

  it("preview mode hides editing controls", async () => {
    const user = userEvent.setup()
    const onPreview = vi.fn()
    render(<DashboardDesigner config={sampleConfig} onPreview={onPreview} />)

    await user.click(screen.getByTestId("preview-button"))
    expect(onPreview).toHaveBeenCalledTimes(1)

    // In preview mode, no delete buttons
    expect(screen.queryByTestId("delete-widget-w1")).not.toBeInTheDocument()
    // Exit preview button should be visible
    expect(screen.getByTestId("exit-preview-button")).toBeInTheDocument()
  })

  it("readOnly mode hides editing controls", () => {
    render(<DashboardDesigner config={sampleConfig} readOnly />)
    expect(screen.queryByTestId("add-widget-button")).not.toBeInTheDocument()
    expect(screen.queryByTestId("undo-button")).not.toBeInTheDocument()
    expect(screen.queryByTestId("redo-button")).not.toBeInTheDocument()
    expect(screen.queryByTestId("delete-widget-w1")).not.toBeInTheDocument()
  })

  it("save fires onSave", async () => {
    const user = userEvent.setup()
    const onSave = vi.fn()
    render(<DashboardDesigner config={sampleConfig} onSave={onSave} />)

    await user.click(screen.getByTestId("save-button"))
    expect(onSave).toHaveBeenCalledTimes(1)
    expect(onSave).toHaveBeenCalledWith(sampleConfig)
  })
})
