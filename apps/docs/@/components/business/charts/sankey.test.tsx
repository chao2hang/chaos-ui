import { describe, it, expect, vi } from "vitest"
import * as React from "react"
import { render, screen } from "@testing-library/react"
import { buildSankeyOption } from "./sankey"
import { SankeyChart } from "./index"

vi.mock("echarts-for-react", () => ({
  default: (props: { option?: unknown; style?: React.CSSProperties; className?: string }) => (
    <div data-testid="echarts-sankey" data-option={JSON.stringify(props.option)} className={props.className} style={props.style} />
  ),
}))

const sankeyData = [
  { source: "A", target: "X", value: 30 },
  { source: "A", target: "Y", value: 20 },
  { source: "B", target: "X", value: 15 },
  { source: "B", target: "Y", value: 25 },
  { source: "X", target: "Z", value: 35 },
  { source: "Y", target: "Z", value: 45 },
]

const PALETTE = ["#111", "#222", "#333", "#444", "#555"]

describe("buildSankeyOption", () => {
  it("extracts every node referenced as source or target", () => {
    const option = buildSankeyOption(sankeyData, "source", "target", "value", PALETTE, 320)
    const nodes = (option.series as Array<{ data: Array<{ name: string }> }>)[0].data
    const names = nodes.map((n) => n.name).sort()
    expect(names).toEqual(["A", "B", "X", "Y", "Z"])
  })

  it("preserves link count, source, target and value", () => {
    const option = buildSankeyOption(sankeyData, "source", "target", "value", PALETTE, 320)
    const links = (option.series as Array<{ links: Array<{ source: string; target: string; value: number }> }>)[0].links
    expect(links).toHaveLength(6)
    expect(links).toContainEqual({ source: "A", target: "X", value: 30 })
    expect(links).toContainEqual({ source: "Y", target: "Z", value: 45 })
  })

  it("assigns a layout level so source nodes sit left of targets", () => {
    const option = buildSankeyOption(sankeyData, "source", "target", "value", PALETTE, 320)
    const nodes = (option.series as Array<{ data: Array<{ name: string; depth?: number }> }>)[0].data
    const depth = (n: string) => nodes.find((x) => x.name === n)?.depth
    expect(depth("A")).toBe(0)
    expect(depth("B")).toBe(0)
    expect(depth("X")).toBe(1)
    expect(depth("Y")).toBe(1)
    expect(depth("Z")).toBe(2)
  })

  it("uses sankey series type with the provided height", () => {
    const option = buildSankeyOption(sankeyData, "source", "target", "value", PALETTE, 480)
    const series = (option.series as Array<{ type: string; height: number }>)[0]
    expect(series.type).toBe("sankey")
    expect(series.height).toBe(480)
  })

  it("respects custom xKey / yKey / valueKey", () => {
    const custom = [
      { from: "left", to: "right", weight: 99 },
    ]
    const option = buildSankeyOption(custom, "from", "to", "weight", PALETTE, 300)
    const nodes = (option.series as Array<{ data: Array<{ name: string }> }>)[0].data
    const links = (option.series as Array<{ links: Array<{ value: number }> }>)[0].links
    expect(nodes.map((n) => n.name).sort()).toEqual(["left", "right"])
    expect(links[0].value).toBe(99)
  })

  it("returns an empty sankey when data is empty", () => {
    const option = buildSankeyOption([], "source", "target", "value", PALETTE, 320)
    const series = (option.series as Array<{ data: unknown[]; links: unknown[] }>)[0]
    expect(series.data).toEqual([])
    expect(series.links).toEqual([])
  })

  it("passes palette through to node item colors", () => {
    const option = buildSankeyOption(sankeyData, "source", "target", "value", PALETTE, 320)
    const series = (option.series as Array<{
      data: Array<{ itemStyle?: { color?: string } }>
    }>)[0]
    const colors = series.data.map((n) => n.itemStyle?.color).filter(Boolean)
    expect(colors.length).toBeGreaterThan(0)
    for (const c of colors) {
      expect(PALETTE).toContain(c)
    }
  })
})

describe("SankeyChart", () => {
  it("renders ChartSkeleton when loading", () => {
    render(<SankeyChart data={[]} loading />)
    expect(screen.getByRole("status", { name: "图表加载中" })).toBeInTheDocument()
    expect(screen.queryByTestId("echarts-sankey")).not.toBeInTheDocument()
  })

  it("renders ChartEmpty when data is empty and not loading", () => {
    render(<SankeyChart data={[]} />)
    expect(screen.queryByTestId("echarts-sankey")).not.toBeInTheDocument()
    expect(screen.getByText(/暂无数据/)).toBeInTheDocument()
  })

  it("renders ECharts container with valid option when data is provided", () => {
    render(<SankeyChart data={sankeyData} xKey="source" yKey="target" valueKey="value" />)
    const el = screen.getByTestId("echarts-sankey")
    expect(el).toBeInTheDocument()
    const data = JSON.parse(el.getAttribute("data-option") ?? "{}")
    const series = (data.series as Array<{ type: string; data: unknown[]; links: unknown[] }>)[0]
    expect(series.type).toBe("sankey")
    expect(series.data).toHaveLength(5)
    expect(series.links).toHaveLength(6)
  })

  it("coerces numeric string values for links", () => {
    const rows = [
      { source: "A", target: "B", value: "12" as unknown as number },
    ]
    render(<SankeyChart data={rows} xKey="source" yKey="target" valueKey="value" />)
    const el = screen.getByTestId("echarts-sankey")
    const data = JSON.parse(el.getAttribute("data-option") ?? "{}")
    const links = (data.series as Array<{ links: Array<{ value: number }> }>)[0].links
    expect(links[0].value).toBe(12)
  })
})
