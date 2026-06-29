import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CommandPalette, type CommandGroup } from "./command-palette"

const groups: CommandGroup[] = [
  {
    id: "g1",
    label: "导航",
    items: [
      { id: "home", label: "首页", shortcut: "mod+H" },
      { id: "settings", label: "设置", shortcut: "mod+," },
      { id: "profile", label: "个人资料", description: "查看并编辑您的资料" },
    ],
  },
  {
    id: "g2",
    label: "操作",
    items: [
      { id: "new", label: "新建文档", keywords: ["create", "add"] },
      { id: "disabled", label: "禁用项", disabled: true },
    ],
  },
]

beforeEach(() => {
  // matchMedia 等已经由 vitest.setup 提供
})

describe("CommandPalette", () => {
  it("opens when open prop is true and renders items", () => {
    render(<CommandPalette open groups={groups} />)
    expect(screen.getByText("首页")).toBeInTheDocument()
    expect(screen.getByText("设置")).toBeInTheDocument()
    expect(screen.getByText("个人资料")).toBeInTheDocument()
  })

  it("shows group headings", () => {
    render(<CommandPalette open groups={groups} />)
    expect(screen.getByText("导航")).toBeInTheDocument()
    expect(screen.getByText("操作")).toBeInTheDocument()
  })

  it("calls onSelect of item and closes on click", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    const onOpenChange = vi.fn()
    const items: CommandGroup[] = [
      {
        id: "g",
        label: "g",
        items: [{ id: "x", label: "选中我", onSelect: handle }],
      },
    ]
    render(<CommandPalette open groups={items} onOpenChange={onOpenChange} />)
    await user.click(screen.getByText("选中我"))
    expect(handle).toHaveBeenCalled()
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it("filters items via input typing", async () => {
    const user = userEvent.setup()
    render(<CommandPalette open groups={groups} />)
    const input = screen.getByPlaceholderText("输入命令或搜索...")
    await user.type(input, "新建")
    expect(screen.getByText("新建文档")).toBeInTheDocument()
    expect(screen.queryByText("首页")).not.toBeInTheDocument()
  })

  it("opens with keyboard shortcut mod+k", () => {
    const onOpenChange = vi.fn()
    render(
      <div>
        <CommandPalette groups={groups} onOpenChange={onOpenChange} />
      </div>,
    )
    fireEvent.keyDown(document, { key: "k", metaKey: true })
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it("renders empty state when nothing matches", async () => {
    const user = userEvent.setup()
    render(<CommandPalette open groups={groups} emptyText="无匹配项" />)
    const input = screen.getByPlaceholderText("输入命令或搜索...")
    await user.type(input, "no-such-thing-xyz")
    expect(screen.getByText("无匹配项")).toBeInTheDocument()
  })

  it("renders footer count when items exist", () => {
    render(<CommandPalette open groups={groups} />)
    expect(screen.getByText(/共\s*5\s*项/)).toBeInTheDocument()
  })

  it("hides shortcut when showShortcut is false", () => {
    render(<CommandPalette open groups={groups} showShortcut={false} />)
    expect(screen.queryByText("共 5 项")).not.toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(
      <CommandPalette open groups={groups} className="custom-cmd" />,
    )
    expect(container.querySelector(".custom-cmd")).toBeInTheDocument()
  })
})
