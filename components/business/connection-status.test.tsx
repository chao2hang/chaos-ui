import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, act } from "@testing-library/react"
import { ConnectionStatus } from "./connection-status"

describe("ConnectionStatus", () => {
  beforeEach(() => {
    Object.defineProperty(navigator, "onLine", { value: true, configurable: true })
  })

  it("does not render when online and showWhenOnline is false", () => {
    const { container } = render(<ConnectionStatus />)
    expect(container.firstChild).toBeNull()
  })

  it("renders banner when online and showWhenOnline is true", () => {
    render(<ConnectionStatus variant="banner" showWhenOnline />)
    expect(screen.getByText("已连接")).toBeInTheDocument()
  })

  it("renders offline state", () => {
    Object.defineProperty(navigator, "onLine", { value: false, configurable: true })
    render(<ConnectionStatus variant="banner" />)
    expect(screen.getByText("网络断开")).toBeInTheDocument()
  })

  it("renders inline variant", () => {
    render(<ConnectionStatus variant="inline" showWhenOnline />)
    expect(screen.getByText("已连接")).toBeInTheDocument()
  })

  it("renders toast variant", () => {
    render(<ConnectionStatus variant="toast" showWhenOnline />)
    expect(screen.getByText("已连接")).toBeInTheDocument()
  })

  it("switches to syncing then online after coming back online", () => {
    vi.useFakeTimers()
    Object.defineProperty(navigator, "onLine", { value: false, configurable: true })
    const { rerender } = render(<ConnectionStatus variant="banner" showWhenOnline={false} />)
    Object.defineProperty(navigator, "onLine", { value: true, configurable: true })
    act(() => {
      window.dispatchEvent(new Event("online"))
    })
    rerender(<ConnectionStatus variant="banner" showWhenOnline />)
    act(() => {
      vi.advanceTimersByTime(900)
    })
  })
})
