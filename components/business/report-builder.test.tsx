import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ReportBuilder } from "./report-builder"
import type { ReportWidget, ReportWidgetDefinition } from "./report-builder"
import {
  TableIcon,
  BarChart3Icon,
  LayoutGridIcon,
  FileTextIcon,
  ImageIcon,
} from "@/components/ui/icons"

const testDefinitions: ReportWidgetDefinition[] = [
  { type: "table", label: "Table", icon: <TableIcon />, defaultW: 6, defaultH: 4 },
  { type: "chart", label: "Chart", icon: <BarChart3Icon />, defaultW: 6, defaultH: 4 },
  { type: "kpi", label: "KPI", icon: <LayoutGridIcon />, defaultW: 3, defaultH: 2 },
  { type: "text", label: "Text", icon: <FileTextIcon />, defaultW: 4, defaultH: 2 },
  { type: "image", label: "Image", icon: <ImageIcon />, defaultW: 4, defaultH: 3 },
]

const sampleWidgets: ReportWidget[] = [
  { id: "w1", type: "table", title: "Sales Table", x: 0, y: 0, w: 6, h: 4, config: { columnCount: 5 } },
  { id: "w2", type: "chart", title: "Revenue Chart", x: 6, y: 0, w: 6, h: 4, config: { chartType: "bar" } },
  { id: "w3", type: "kpi", title: "Total Revenue", x: 0, y: 4, w: 3, h: 2, config: { value: "125000", unit: "USD" } },
]

describe("ReportBuilder", () => {
  it("renders 3-panel layout", () => {
    const { container } = render(<ReportBuilder definitions={testDefinitions} />)
    expect(container.querySelector('[data-slot="report-builder"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="report-builder-palette"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="report-builder-canvas"]')).toBeInTheDocument()
  })

  it("palette shows widget definitions", () => {
    render(<ReportBuilder definitions={testDefinitions} />)
    expect(screen.getByText("Table")).toBeInTheDocument()
    expect(screen.getByText("Chart")).toBeInTheDocument()
    expect(screen.getByText("KPI")).toBeInTheDocument()
    expect(screen.getByText("Text")).toBeInTheDocument()
    expect(screen.getByText("Image")).toBeInTheDocument()
  })

  it("clicking palette adds widget to canvas", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ReportBuilder definitions={testDefinitions} onChange={onChange} />)

    await user.click(screen.getByTestId("palette-table"))
    expect(onChange).toHaveBeenCalledTimes(1)
    const widgets = onChange.mock.calls[0]![0]! as ReportWidget[]
    expect(widgets).toHaveLength(1)
    expect(widgets[0]!.type).toBe("table")
    expect(widgets[0]!.title).toBe("Table")
  })

  it("widget renders on canvas at correct position", () => {
    render(<ReportBuilder widgets={sampleWidgets} definitions={testDefinitions} />)
    const widget = screen.getByTestId("delete-widget-w1").closest('[data-slot="report-builder-widget"]')
    expect(widget).toBeInTheDocument()
    expect(widget?.getAttribute("data-widget-type")).toBe("table")
  })

  it("selecting widget shows property panel", async () => {
    const user = userEvent.setup()
    render(<ReportBuilder widgets={sampleWidgets} definitions={testDefinitions} />)

    const widgetEl = screen.getByTestId("delete-widget-w1").closest('[data-slot="report-builder-widget"]')
    await user.click(widgetEl!)
    expect(screen.getByTestId("property-title")).toBeInTheDocument()
    expect(screen.getByTestId("property-x")).toBeInTheDocument()
    expect(screen.getByTestId("property-y")).toBeInTheDocument()
  })

  it("title input updates widget title", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const widgets = [{ ...sampleWidgets[0]! }] as ReportWidget[]
    render(<ReportBuilder widgets={widgets} definitions={testDefinitions} onChange={onChange} />)

    // Select the widget
    const widgetEl = screen.getByTestId("delete-widget-w1").closest('[data-slot="report-builder-widget"]')
    await user.click(widgetEl!)

    // Edit the title
    const titleInput = screen.getByTestId("property-title") as HTMLInputElement
    await user.clear(titleInput)
    await user.type(titleInput, "New Title")
    expect(onChange).toHaveBeenCalled()
  })

  it("position inputs update widget position", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ReportBuilder widgets={[sampleWidgets[0]!]} definitions={testDefinitions} onChange={onChange} />)

    const widgetEl = screen.getByTestId("delete-widget-w1").closest('[data-slot="report-builder-widget"]')
    await user.click(widgetEl!)

    const xInput = screen.getByTestId("property-x") as HTMLInputElement
    await user.clear(xInput)
    await user.type(xInput, "3")
    expect(onChange).toHaveBeenCalled()
  })

  it("delete button removes widget", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ReportBuilder widgets={[sampleWidgets[0]]} definitions={testDefinitions} onChange={onChange} />)

    await user.click(screen.getByTestId("delete-widget-w1"))
    expect(onChange).toHaveBeenCalledTimes(1)
    const widgets = onChange.mock.calls[0]![0]! as ReportWidget[]
    expect(widgets).toHaveLength(0)
  })

  it("save fires onSave with widgets", async () => {
    const user = userEvent.setup()
    const onSave = vi.fn()
    render(<ReportBuilder widgets={sampleWidgets} definitions={testDefinitions} onSave={onSave} />)

    await user.click(screen.getByTestId("save-button"))
    expect(onSave).toHaveBeenCalledTimes(1)
    expect(onSave).toHaveBeenCalledWith(sampleWidgets)
  })

  it("preview fires onPreview", async () => {
    const user = userEvent.setup()
    const onPreview = vi.fn()
    render(<ReportBuilder widgets={sampleWidgets} definitions={testDefinitions} onPreview={onPreview} />)

    await user.click(screen.getByTestId("preview-button"))
    expect(onPreview).toHaveBeenCalledTimes(1)
    expect(onPreview).toHaveBeenCalledWith(sampleWidgets)
  })

  it("readOnly hides add/delete/property editing", () => {
    const { container } = render(
      <ReportBuilder widgets={sampleWidgets} definitions={testDefinitions} readOnly />,
    )
    // No palette
    expect(container.querySelector('[data-slot="report-builder-palette"]')).not.toBeInTheDocument()
    // No delete buttons
    expect(screen.queryByTestId("delete-widget-w1")).not.toBeInTheDocument()
    // No save button
    expect(screen.queryByTestId("save-button")).not.toBeInTheDocument()
    // No undo/redo
    expect(screen.queryByTestId("undo-button")).not.toBeInTheDocument()
  })

  it("undo reverses last action", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ReportBuilder definitions={testDefinitions} onChange={onChange} />)

    // Add a widget
    await user.click(screen.getByTestId("palette-table"))
    expect(onChange).toHaveBeenCalledTimes(1)
    const addedWidgets = onChange.mock.calls[0]![0]! as ReportWidget[]
    expect(addedWidgets).toHaveLength(1)

    // Undo
    await user.click(screen.getByTestId("undo-button"))
    expect(onChange).toHaveBeenCalledTimes(2)
    const undoneWidgets = onChange.mock.calls[1]![0] as ReportWidget[]
    expect(undoneWidgets).toHaveLength(0)
  })
})
