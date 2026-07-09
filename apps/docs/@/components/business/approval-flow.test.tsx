import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { ApprovalFlow } from "./approval-flow"

const nodes = [
  { id: "1", name: "经理审批", type: "approver", status: "approved" as const },
  { id: "2", name: "总监审批", type: "approver", status: "pending" as const },
  { id: "3", name: "财务复核", type: "approver", status: "pending" as const },
]

const edges = [
  { from: "1", to: "2" },
  { from: "2", to: "3" },
]

describe("ApprovalFlow", () => {
  it("renders all nodes", () => {
    const { container } = render(<ApprovalFlow nodes={nodes} edges={edges} />)
    expect(container.textContent).toContain("经理审批")
    expect(container.textContent).toContain("总监审批")
    expect(container.textContent).toContain("财务复核")
  })

  it("renders with custom className", () => {
    const { container } = render(<ApprovalFlow nodes={nodes} edges={edges} className="custom-af" />)
    expect(container.querySelector('[data-slot="approval-flow"]')?.className).toContain("custom-af")
  })
})
