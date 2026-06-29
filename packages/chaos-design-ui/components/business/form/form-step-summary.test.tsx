import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FormStepSummary } from "./form-step-summary"

const steps = [
  { id: "name", title: "名称" },
  { id: "email", title: "邮箱" },
  { id: "address", title: "地址", optional: true },
]

describe("FormStepSummary", () => {
  it("marks filled values with check icon", () => {
    render(<FormStepSummary steps={steps} values={{ name: "Alice", email: "", address: "" }} />)
    expect(screen.getByText("Alice")).toBeInTheDocument()
  })

  it("shows optional badge", () => {
    render(<FormStepSummary steps={steps} values={{}} />)
    expect(screen.getByText("可选")).toBeInTheDocument()
  })

  it("shows count for array values", () => {
    render(
      <FormStepSummary
        steps={[{ id: "tags", title: "Tags" }]}
        values={{ tags: ["a", "b", "c"] }}
      />
    )
    expect(screen.getByText("3 项")).toBeInTheDocument()
  })

  it("renders edit button when onJumpTo is provided", () => {
    render(<FormStepSummary steps={steps} values={{}} onJumpTo={() => {}} />)
    expect(screen.getAllByText("编辑")).toHaveLength(steps.length)
  })
})
