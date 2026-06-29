import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CoachMark } from "./coach-mark"

describe("CoachMark", () => {
  it("does not render when closed", () => {
    const { container } = render(
      <CoachMark
        open={false}
        onOpenChange={() => {}}
        target={null}
        title="标题"
      />,
    )
    expect(container.querySelector('[data-slot="coach-mark"]')).toBeNull()
  })

  it("renders title and description when open and target present", () => {
    const target = document.createElement("button")
    target.textContent = "anchor"
    document.body.appendChild(target)
    target.getBoundingClientRect = () =>
      ({ top: 0, left: 0, right: 100, bottom: 30, width: 100, height: 30, x: 0, y: 0, toJSON: () => "" }) as DOMRect
    render(
      <CoachMark
        open={true}
        onOpenChange={() => {}}
        target={target}
        title="我的标题"
        description="描述信息"
      />,
    )
    expect(screen.getByText("我的标题")).toBeInTheDocument()
    expect(screen.getByText("描述信息")).toBeInTheDocument()
    document.body.removeChild(target)
  })

  it("triggers onNext and onSkip handlers", async () => {
    const user = userEvent.setup()
    const onNext = vi.fn()
    const onSkip = vi.fn()
    const target = document.createElement("button")
    document.body.appendChild(target)
    target.getBoundingClientRect = () =>
      ({ top: 0, left: 0, right: 100, bottom: 30, width: 100, height: 30, x: 0, y: 0, toJSON: () => "" }) as DOMRect
    render(
      <CoachMark
        open={true}
        onOpenChange={() => {}}
        target={target}
        title="T"
        onNext={onNext}
        onSkip={onSkip}
      />,
    )
    await user.click(screen.getByText("下一步"))
    await user.click(screen.getByText("跳过"))
    expect(onNext).toHaveBeenCalledTimes(1)
    expect(onSkip).toHaveBeenCalledTimes(1)
    document.body.removeChild(target)
  })

  it("hides skip button when showSkip is false", () => {
    const target = document.createElement("button")
    document.body.appendChild(target)
    target.getBoundingClientRect = () =>
      ({ top: 0, left: 0, right: 100, bottom: 30, width: 100, height: 30, x: 0, y: 0, toJSON: () => "" }) as DOMRect
    render(
      <CoachMark
        open={true}
        onOpenChange={() => {}}
        target={target}
        title="T"
        showSkip={false}
      />,
    )
    expect(screen.queryByText("跳过")).not.toBeInTheDocument()
    document.body.removeChild(target)
  })
})
