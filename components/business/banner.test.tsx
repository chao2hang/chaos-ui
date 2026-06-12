import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Banner } from "./banner"

describe("Banner", () => {
  it("renders with title and description", () => {
    render(<Banner title="Warning" description="Something happened." />)
    expect(screen.getByText("Warning")).toBeInTheDocument()
    expect(screen.getByText("Something happened.")).toBeInTheDocument()
  })

  it("renders with info variant by default", () => {
    const { container } = render(<Banner title="Info" />)
    const banner = container.querySelector('[data-slot="banner"]')
    expect(banner?.getAttribute("data-variant")).toBe("info")
  })

  it("can be closed when closable", async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Banner title="Closable" closable onClose={handleClose} />,
    )
    const closeBtn = screen.getByRole("button", { name: "关闭" })
    await user.click(closeBtn)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it("does not show close button when closable is false", () => {
    render(<Banner title="Persistent" closable={false} />)
    expect(
      screen.queryByRole("button", { name: "关闭" }),
    ).not.toBeInTheDocument()
  })

  it("renders action node", () => {
    render(
      <Banner title="With Action" action={<button>Retry</button>} />,
    )
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument()
  })
})
