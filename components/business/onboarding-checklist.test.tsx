import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { OnboardingChecklist } from "./onboarding-checklist"

const steps = [
  { id: "a", title: "A 任务" },
  { id: "b", title: "B 任务", description: "B 的描述" },
  { id: "c", title: "C 任务", optional: true },
]

describe("OnboardingChecklist", () => {
  it("renders all step titles", () => {
    render(<OnboardingChecklist steps={steps} />)
    expect(screen.getByText("A 任务")).toBeInTheDocument()
    expect(screen.getByText("B 任务")).toBeInTheDocument()
    expect(screen.getByText("C 任务")).toBeInTheDocument()
  })

  it("shows progress percentage", () => {
    render(<OnboardingChecklist steps={steps} completedIds={["a"]} />)
    expect(screen.getByText("1 / 3 已完成")).toBeInTheDocument()
    expect(screen.getByText("33%")).toBeInTheDocument()
  })

  it("calls onToggle when checkbox is changed", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(
      <OnboardingChecklist
        steps={steps}
        onToggle={handle}
      />,
    )
    const checkbox = screen.getByLabelText("A 任务") as HTMLInputElement
    await user.click(checkbox)
    expect(handle).toHaveBeenCalledWith("a", true)
  })

  it("marks completed steps with line-through", () => {
    render(<OnboardingChecklist steps={steps} completedIds={["a"]} />)
    const title = screen.getByText("A 任务")
    expect(title.className).toContain("line-through")
  })

  it("applies data-slot attribute", () => {
    const { container } = render(<OnboardingChecklist steps={steps} />)
    expect(container.querySelector('[data-slot="onboarding-checklist"]')).toBeInTheDocument()
  })
})
