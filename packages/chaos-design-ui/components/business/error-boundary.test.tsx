import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ErrorBoundary } from "./error-boundary"

function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error("Boom!")
  return <div>正常</div>
}

describe("ErrorBoundary", () => {
  it("renders children when no error", () => {
    render(
      <ErrorBoundary>
        <div>Hello</div>
      </ErrorBoundary>,
    )
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })

  it("renders default fallback when child throws", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {})
    render(
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>,
    )
    expect(screen.getByText(/组件出错了/)).toBeInTheDocument()
    expect(screen.getByText("Boom!")).toBeInTheDocument()
    consoleError.mockRestore()
  })

  it("calls onError when error is caught", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {})
    const handle = vi.fn()
    render(
      <ErrorBoundary onError={handle}>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>,
    )
    expect(handle).toHaveBeenCalled()
    consoleError.mockRestore()
  })

  it("resets state when retry clicked", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {})
    const user = userEvent.setup()
    render(
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>,
    )
    expect(screen.getByText(/组件出错了/)).toBeInTheDocument()
    await user.click(screen.getByText("重试"))
    expect(screen.queryByText(/组件出错了/)).not.toBeInTheDocument()
    consoleError.mockRestore()
  })

  it("renders custom fallback when provided", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {})
    render(
      <ErrorBoundary fallback={<div>自定义错误</div>}>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>,
    )
    expect(screen.getByText("自定义错误")).toBeInTheDocument()
    consoleError.mockRestore()
  })
})
