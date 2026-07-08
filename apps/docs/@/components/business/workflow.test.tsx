import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { WorkflowViewer, type WorkflowNodeData } from "./workflow"
import type { Node, Edge } from "@xyflow/react"

const nodes: Node<WorkflowNodeData>[] = [
  { id: "1", type: "workflow", position: { x: 0, y: 0 }, data: { label: "Start" } },
  { id: "2", type: "workflow", position: { x: 0, y: 100 }, data: { label: "End" } },
]
const edges: Edge[] = [{ id: "e1", source: "1", target: "2" }]

describe("WorkflowViewer", () => {
  it("renders container", () => {
    const { container } = render(<WorkflowViewer nodes={nodes} edges={edges} />)
    expect(container.querySelector('[data-slot="workflow-viewer"]')).toBeTruthy()
  })

  it("renders with custom className", () => {
    const { container } = render(
      <WorkflowViewer nodes={nodes} edges={edges} className="custom-wf" />,
    )
    expect(container.querySelector('[data-slot="workflow-viewer"]')?.className).toContain("custom-wf")
  })

  it("applies custom height", () => {
    const { container } = render(<WorkflowViewer nodes={nodes} edges={edges} height={600} />)
    expect(container.querySelector('[data-slot="workflow-viewer"]')?.getAttribute("style")).toContain("600")
  })
})
