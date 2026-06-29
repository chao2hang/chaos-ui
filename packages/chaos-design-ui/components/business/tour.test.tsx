import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Tour, type TourStep } from "./tour"

const steps: TourStep[] = [
  {
    target: "#step-1",
    title: "第一步",
    description: "这是第一步说明",
    placement: "bottom",
  },
  {
    target: "#step-2",
    title: "第二步",
    description: "这是第二步说明",
    placement: "top",
  },
  {
    target: "#step-3",
    title: "完成",
    description: "恭喜完成",
  },
]

function Setup() {
  return (
    <div>
      <div id="step-1" style={{ width: 100, height: 40 }} data-testid="s1">
        目标 1
      </div>
      <div id="step-2" style={{ width: 100, height: 40 }} data-testid="s2">
        目标 2
      </div>
      <div id="step-3" style={{ width: 100, height: 40 }} data-testid="s3">
        目标 3
      </div>
    </div>
  )
}

beforeEach(() => {
  // Ensure ResizeObserver is in place (vitest.setup provides it)
  window.localStorage.clear()
})

describe("Tour", () => {
  it("renders tour card with first step title", async () => {
    render(
      <>
        <Setup />
        <Tour steps={steps} open />
      </>,
    )
    expect(await screen.findByText("第一步")).toBeInTheDocument()
    expect(screen.getByText("1 / 3")).toBeInTheDocument()
  })

  it("navigates to next step on click", async () => {
    const user = userEvent.setup()
    render(
      <>
        <Setup />
        <Tour steps={steps} open />
      </>,
    )
    expect(await screen.findByText("第一步")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: /下一步/ }))
    expect(await screen.findByText("第二步")).toBeInTheDocument()
    expect(screen.getByText("2 / 3")).toBeInTheDocument()
  })

  it("disables previous button on first step", async () => {
    render(
      <>
        <Setup />
        <Tour steps={steps} open />
      </>,
    )
    expect(await screen.findByText("第一步")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /上一步/ })).toBeDisabled()
  })

  it("calls onComplete when finish is clicked on last step", async () => {
    const user = userEvent.setup()
    const onComplete = vi.fn()
    render(
      <>
        <Setup />
        <Tour steps={steps} open onComplete={onComplete} />
      </>,
    )
    expect(await screen.findByText("第一步")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: /下一步/ }))
    await user.click(screen.getByRole("button", { name: /下一步/ }))
    expect(await screen.findByText("完成")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "完成" }))
    expect(onComplete).toHaveBeenCalled()
  })

  it("calls onSkip when skip is clicked", async () => {
    const user = userEvent.setup()
    const onSkip = vi.fn()
    render(
      <>
        <Setup />
        <Tour steps={steps} open onSkip={onSkip} />
      </>,
    )
    expect(await screen.findByText("第一步")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "跳过" }))
    expect(onSkip).toHaveBeenCalled()
  })

  it("calls onSkip when close button is clicked", async () => {
    const user = userEvent.setup()
    const onSkip = vi.fn()
    render(
      <>
        <Setup />
        <Tour steps={steps} open onSkip={onSkip} />
      </>,
    )
    expect(await screen.findByText("第一步")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "关闭" }))
    expect(onSkip).toHaveBeenCalled()
  })

  it("calls onSkip when backdrop is clicked", async () => {
    const onSkip = vi.fn()
    render(
      <>
        <Setup />
        <Tour steps={steps} open onSkip={onSkip} />
      </>,
    )
    expect(await screen.findByText("第一步")).toBeInTheDocument()
    const backdrop = document.querySelector(".fixed.inset-0")
    expect(backdrop).toBeInTheDocument()
    fireEvent.click(backdrop as Element)
    expect(onSkip).toHaveBeenCalled()
  })

  it("stores completion in localStorage when storageKey provided", async () => {
    const user = userEvent.setup()
    render(
      <>
        <Setup />
        <Tour steps={steps} open storageKey="test-tour" />
      </>,
    )
    expect(await screen.findByText("第一步")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "跳过" }))
    expect(window.localStorage.getItem("test-tour")).toBe("1")
  })

  it("navigates back with previous button", async () => {
    const user = userEvent.setup()
    render(
      <>
        <Setup />
        <Tour steps={steps} open />
      </>,
    )
    expect(await screen.findByText("第一步")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: /下一步/ }))
    expect(await screen.findByText("第二步")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: /上一步/ }))
    expect(await screen.findByText("第一步")).toBeInTheDocument()
  })
})
