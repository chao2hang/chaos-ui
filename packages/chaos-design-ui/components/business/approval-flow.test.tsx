import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { ApprovalFlow } from "./approval-flow"

const steps = [
  { id: "1", name: "经理审批", approver: { name: "王经理" }, status: "approved" as const },
  { id: "2", name: "总监审批", approver: { name: "李总监" }, status: "pending" as const },
  { id: "3", name: "财务复核", approver: { name: "陈财务" }, status: "pending" as const },
]

describe("ApprovalFlow", () => {
  it("renders all steps", () => {
    const { container } = render(<ApprovalFlow steps={steps} />)
    expect(container.textContent).toContain("经理审批")
    expect(container.textContent).toContain("总监审批")
    expect(container.textContent).toContain("财务复核")
  })

  it("renders approver names", () => {
    const { container } = render(<ApprovalFlow steps={steps} />)
    expect(container.textContent).toContain("王经理")
    expect(container.textContent).toContain("李总监")
  })

  it("renders with custom className", () => {
    const { container } = render(<ApprovalFlow steps={steps} className="custom-af" />)
    expect(container.querySelector('[data-slot="approval-flow"]')?.className).toContain("custom-af")
  })
})
