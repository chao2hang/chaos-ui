import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { NotificationCenter, type NotificationItem } from "./notification-center"

const notifications: NotificationItem[] = [
  {
    id: "1",
    title: "新评论",
    description: "李雷 评论了您的文档",
    timestamp: Date.now() - 600_000,
    read: false,
    type: "info",
  },
  {
    id: "2",
    title: "部署成功",
    description: "v1.2.0 已发布到生产",
    timestamp: Date.now() - 3_600_000,
    read: false,
    type: "success",
    action: { label: "查看", onClick: vi.fn() },
  },
  {
    id: "3",
    title: "构建失败",
    description: "CI 流水线退出码 1",
    timestamp: Date.now() - 86_400_000,
    read: true,
    type: "error",
  },
]

describe("NotificationCenter", () => {
  it("renders trigger button with bell icon", () => {
    render(<NotificationCenter notifications={notifications} />)
    const trigger = screen.getByRole("button", { name: /通知/ })
    expect(trigger).toBeInTheDocument()
  })

  it("shows unread count badge on trigger", () => {
    render(<NotificationCenter notifications={notifications} />)
    expect(screen.getByText("2")).toBeInTheDocument()
  })

  it("caps unread badge at 99+ when over 99", () => {
    const many: NotificationItem[] = Array.from({ length: 105 }, (_, i) => ({
      id: String(i),
      title: `n${i}`,
      timestamp: Date.now(),
      read: false,
    }))
    render(<NotificationCenter notifications={many} />)
    expect(screen.getByText("99+")).toBeInTheDocument()
  })

  it("shows notification titles in popover", async () => {
    const user = userEvent.setup()
    render(<NotificationCenter notifications={notifications} />)
    await user.click(screen.getByRole("button", { name: /通知/ }))
    expect(screen.getByText("新评论")).toBeInTheDocument()
    expect(screen.getByText("部署成功")).toBeInTheDocument()
    expect(screen.getByText("构建失败")).toBeInTheDocument()
  })

  it("shows empty state when no notifications", async () => {
    const user = userEvent.setup()
    render(<NotificationCenter notifications={[]} />)
    await user.click(screen.getByRole("button", { name: /通知/ }))
    expect(screen.getByText("暂无通知")).toBeInTheDocument()
  })

  it("uses custom emptyText", async () => {
    const user = userEvent.setup()
    render(<NotificationCenter notifications={[]} emptyText="全清静啦" />)
    await user.click(screen.getByRole("button", { name: /通知/ }))
    expect(screen.getByText("全清静啦")).toBeInTheDocument()
  })

  it("calls onMarkAllRead when button clicked", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(
      <NotificationCenter notifications={notifications} onMarkAllRead={handle} />,
    )
    await user.click(screen.getByRole("button", { name: /通知/ }))
    const markAll = screen.getByRole("button", { name: "全部已读" })
    await user.click(markAll)
    expect(handle).toHaveBeenCalled()
  })

  it("calls onClear when clear button clicked", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<NotificationCenter notifications={notifications} onClear={handle} />)
    await user.click(screen.getByRole("button", { name: /通知/ }))
    const clearBtn = screen.getByRole("button", { name: "清空" })
    await user.click(clearBtn)
    expect(handle).toHaveBeenCalled()
  })

  it("calls onItemClick and onMarkRead when item clicked", async () => {
    const user = userEvent.setup()
    const onItem = vi.fn()
    const onMark = vi.fn()
    render(
      <NotificationCenter
        notifications={notifications}
        onItemClick={onItem}
        onMarkRead={onMark}
      />,
    )
    await user.click(screen.getByRole("button", { name: /通知/ }))
    await user.click(screen.getByText("新评论"))
    expect(onItem).toHaveBeenCalled()
    expect(onMark).toHaveBeenCalledWith("1")
  })

  it("applies custom className", () => {
    const { container } = render(
      <NotificationCenter notifications={notifications} className="custom-notif" />,
    )
    expect(container.innerHTML).toContain("custom-notif")
  })
})
