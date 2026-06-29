import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SettingsLayout, isNavGroup, isNavSubGroup } from "./settings-layout"
import type { SettingsNavEntry, SettingsNavItem, SettingsNavSubGroup } from "./settings-layout"

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

  it("renders group label and its children", () => {
    render(
      <SettingsLayout
        nav={[
          {
            key: "group1",
            label: "用户设置",
            defaultOpen: true,
            children: [
              { key: "profile", label: "个人资料" },
              { key: "avatar", label: "头像" },
            ],
          },
        ]}
        active="profile"
        sections={[]}
      />,
    )
    expect(screen.getByText("用户设置")).toBeInTheDocument()
    expect(screen.getByText("个人资料")).toBeInTheDocument()
    expect(screen.getByText("头像")).toBeInTheDocument()
  })

  it("renders sub-group (3rd level) items", () => {
    render(
      <SettingsLayout
        nav={[
          {
            key: "system",
            label: "系统设置",
            defaultOpen: true,
            children: [
              {
                key: "appearance",
                label: "外观",
                defaultOpen: true,
                children: [
                  { key: "theme", label: "主题" },
                  { key: "layout", label: "布局" },
                ],
              },
            ],
          },
        ]}
        active="theme"
        sections={[]}
      />,
    )
    expect(screen.getByText("系统设置")).toBeInTheDocument()
    expect(screen.getByText("外观")).toBeInTheDocument()
    expect(screen.getByText("主题")).toBeInTheDocument()
    expect(screen.getByText("布局")).toBeInTheDocument()
  })

  it("calls onNavChange when 3rd-level item clicked", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(
      <SettingsLayout
        nav={[
          {
            key: "system",
            label: "系统设置",
            defaultOpen: true,
            children: [
              {
                key: "appearance",
                label: "外观",
                defaultOpen: true,
                children: [
                  { key: "theme", label: "主题" },
                  { key: "layout", label: "布局" },
                ],
              },
            ],
          },
        ]}
        active="theme"
        onNavChange={handle}
        sections={[]}
      />,
    )
    await user.click(screen.getByText("布局"))
    expect(handle).toHaveBeenCalledWith("layout")
  })
})

describe("isNavGroup", () => {
  it("returns true for group entries", () => {
    const entry: SettingsNavEntry = {
      key: "g",
      label: "Group",
      children: [{ key: "a", label: "A" }],
    }
    expect(isNavGroup(entry)).toBe(true)
  })

  it("returns false for flat items", () => {
    const entry: SettingsNavEntry = { key: "a", label: "A" }
    expect(isNavGroup(entry)).toBe(false)
  })
})

describe("isNavSubGroup", () => {
  it("returns true for sub-groups", () => {
    const entry: SettingsNavItem | SettingsNavSubGroup = {
      key: "sub",
      label: "Sub",
      children: [{ key: "a", label: "A" }],
    }
    expect(isNavSubGroup(entry)).toBe(true)
  })

  it("returns false for flat items", () => {
    const entry: SettingsNavItem | SettingsNavSubGroup = { key: "a", label: "A" }
    expect(isNavSubGroup(entry)).toBe(false)
  })
})
