import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CookieBanner } from "./cookie-banner"

describe("CookieBanner", () => {
  it("does not render when open is false", () => {
    const { container } = render(<CookieBanner open={false} />)
    expect(container.querySelector('[data-slot="cookie-banner"]')).toBeNull()
  })

  it("renders default title and description when open", () => {
    render(<CookieBanner open={true} />)
    expect(screen.getByText("Cookie 使用提示")).toBeInTheDocument()
  })

  it("calls onAccept when accept clicked", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<CookieBanner open={true} onAccept={handle} />)
    await user.click(screen.getByText("接受全部"))
    expect(handle).toHaveBeenCalledTimes(1)
  })

  it("calls onReject when reject clicked", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<CookieBanner open={true} onReject={handle} />)
    await user.click(screen.getByText("仅必要"))
    expect(handle).toHaveBeenCalledTimes(1)
  })

  it("calls onDismiss when close clicked", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<CookieBanner open={true} onDismiss={handle} />)
    await user.click(screen.getByLabelText("关闭"))
    expect(handle).toHaveBeenCalledTimes(1)
  })

  it("shows policy link when policyUrl provided", () => {
    render(<CookieBanner open={true} policyUrl="#policy" />)
    const link = screen.getByText("隐私政策")
    expect(link.closest("a")?.getAttribute("href")).toBe("#policy")
  })
})
