import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { OrgChart } from "./org-chart"
import type { OrgNode, OrgEdge } from "./org-chart"

const nodes: OrgNode[] = [
  { id: "1", name: "Alice", title: "CEO" },
  { id: "2", name: "Bob", title: "CTO" },
]

const edges: OrgEdge[] = [{ source: "1", target: "2" }]

vi.mock("@xyflow/react", () => ({
  ReactFlow: ({ nodes, edges, onNodeClick, ...props }: any) => (
    <div data-testid="react-flow" data-nodes={JSON.stringify(nodes)} data-edges={JSON.stringify(edges)}>
      {nodes?.map((n: any) => (
        <button key={n.id} data-testid={`node-${n.id}`} onClick={() => onNodeClick?.({}, n)}>
          {n.data.orgNode.name}
        </button>
      ))}
    </div>
  ),
  Background: () => <div data-testid="background" />,
  Controls: () => <div data-testid="controls" />,
  Handle: () => <div />,
  Position: { Top: "top", Bottom: "bottom" },
  useNodesState: (init: any) => {
    const React = require("react")
    const [s, set] = React.useState(init)
    return [s, set, vi.fn()]
  },
  useEdgesState: (init: any) => {
    const React = require("react")
    const [s, set] = React.useState(init)
    return [s, set, vi.fn()]
  },
}))

describe("OrgChart", () => {
  it("renders without crashing", () => {
    const { container } = render(<OrgChart nodes={nodes} edges={edges} />)
    expect(container.querySelector('[data-slot="org-chart"]')).toBeTruthy()
  })

  it("passes nodes and edges to ReactFlow", () => {
    const { getByTestId } = render(<OrgChart nodes={nodes} edges={edges} />)
    const flow = getByTestId("react-flow")
    expect(flow).toBeTruthy()
  })

  it("applies custom className", () => {
    const { container } = render(<OrgChart nodes={nodes} edges={edges} className="custom-org" />)
    const el = container.querySelector('[data-slot="org-chart"]') as HTMLElement
    expect(el.className).toContain("custom-org")
  })

  it("calls onNodeClick when a node is clicked", () => {
    const handleClick = vi.fn()
    const { getByTestId } = render(<OrgChart nodes={nodes} edges={edges} onNodeClick={handleClick} />)
    getByTestId("node-1").click()
    expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ id: "1", name: "Alice" }))
  })
})
