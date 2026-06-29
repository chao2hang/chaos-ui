import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UserMenu } from "./user-menu"

describe("UserMenu", () => {
  it("renders user name as trigger label", () => {
    render(<UserMenu user={{ name: "李雷" }} />)
    expect(screen.getByLabelText("Open menu for 李雷")).toBeInTheDocument()
  })

  it("opens menu and shows profile/settings", async () => {
    const user = userEvent.setup()
    render(<UserMenu user={{ name: "Alice", email: "a@x.com" }} />)
    await user.click(screen.getByLabelText("Open menu for Alice"))
    expect(await screen.findByText("Alice")).toBeInTheDocument()
    expect(await screen.findByText("a@x.com")).toBeInTheDocument()
    expect(await screen.findByText("个人资料")).toBeInTheDocument()
    expect(await screen.findByText("账户设置")).toBeInTheDocument()
  })

  it("triggers onSignOut handler", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(
      <UserMenu
        user={{ name: "X" }}
        onSignOut={handle}
      />,
    )
    await user.click(screen.getByLabelText("Open menu for X"))
    await user.click(await screen.findByText("退出登录"))
    expect(handle).toHaveBeenCalledTimes(1)
  })

  it("hides profile/settings when flags are off", async () => {
    const user = userEvent.setup()
    render(
      <UserMenu
        user={{ name: "X" }}
        showProfile={false}
        showSettings={false}
      />,
    )
    await user.click(screen.getByLabelText("Open menu for X"))
    expect(screen.queryByText("个人资料")).not.toBeInTheDocument()
    expect(screen.queryByText("账户设置")).not.toBeInTheDocument()
  })
})
