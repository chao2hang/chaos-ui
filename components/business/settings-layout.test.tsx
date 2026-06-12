import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SettingsLayout } from "./settings-layout"

describe("SettingsLayout", () => {
  it("renders all nav items", () => {
    render(
      <SettingsLayout
        nav={[
          { key: "a", label: "账户" },
          { key: "b", label: "安全" },
        ]}
        active="a"
        sections={[]}
      />,
    )
    expect(screen.getByText("账户")).toBeInTheDocument()
    expect(screen.getByText("安全")).toBeInTheDocument()
  })

  it("renders section titles", () => {
    render(
      <SettingsLayout
        nav={[{ key: "a", label: "账户" }]}
        active="a"
        sections={[
          { key: "a", title: "账户设置", content: <div>内容</div> },
        ]}
      />,
    )
    expect(screen.getByText("账户设置")).toBeInTheDocument()
    expect(screen.getByText("内容")).toBeInTheDocument()
  })

  it("calls onNavChange when nav item clicked", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(
      <SettingsLayout
        nav={[
          { key: "a", label: "账户" },
          { key: "b", label: "安全" },
        ]}
        active="a"
        onNavChange={handle}
        sections={[]}
      />,
    )
    await user.click(screen.getByText("安全"))
    expect(handle).toHaveBeenCalledWith("b")
  })

  it("renders nav badge when provided", () => {
    render(
      <SettingsLayout
        nav={[{ key: "a", label: "收件", badge: 5 }]}
        active="a"
        sections={[]}
      />,
    )
    expect(screen.getByText("5")).toBeInTheDocument()
  })

  it("applies data-slot attribute", () => {
    const { container } = render(
      <SettingsLayout
        nav={[]}
        active="a"
        sections={[]}
      />,
    )
    expect(container.querySelector('[data-slot="settings-layout"]')).toBeInTheDocument()
  })
})
