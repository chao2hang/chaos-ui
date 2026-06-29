import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { InboxList, type InboxItem } from "./inbox-list"

const items: InboxItem[] = [
  {
    id: "1",
    from: { name: "Alice" },
    subject: "项目周报",
    preview: "本周工作进度...",
    timestamp: Date.now() - 600_000,
    read: false,
    starred: true,
    labels: ["工作", "重要"],
  },
  {
    id: "2",
    from: { name: "Bob" },
    subject: "代码审查",
    timestamp: Date.now() - 3_600_000,
    read: true,
  },
  {
    id: "3",
    from: { name: "Charlie" },
    subject: "团建通知",
    preview: "下周五团建",
    timestamp: Date.now(),
    read: false,
  },
]

describe("InboxList", () => {
  it("renders all items with subject and sender", () => {
    render(<InboxList items={items} />)
    expect(screen.getByText("项目周报")).toBeInTheDocument()
    expect(screen.getByText("代码审查")).toBeInTheDocument()
    expect(screen.getByText("团建通知")).toBeInTheDocument()
    expect(screen.getByText("Alice")).toBeInTheDocument()
    expect(screen.getByText("Bob")).toBeInTheDocument()
  })

  it("renders labels when present", () => {
    render(<InboxList items={items} />)
    expect(screen.getByText("工作")).toBeInTheDocument()
    expect(screen.getByText("重要")).toBeInTheDocument()
  })

  it("renders search input with placeholder", () => {
    render(<InboxList items={items} />)
    expect(screen.getByPlaceholderText("搜索邮件...")).toBeInTheDocument()
  })

  it("filters items based on search query", async () => {
    const user = userEvent.setup()
    render(<InboxList items={items} />)
    const input = screen.getByPlaceholderText("搜索邮件...")
    await user.type(input, "Bob")
    expect(screen.queryByText("项目周报")).not.toBeInTheDocument()
    expect(screen.getByText("代码审查")).toBeInTheDocument()
  })

  it("calls onSelect when an item is clicked", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<InboxList items={items} onSelect={handle} />)
    await user.click(screen.getByText("项目周报"))
    expect(handle).toHaveBeenCalledWith("1")
  })

  it("calls onStar when star button is clicked", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<InboxList items={items} onStar={handle} />)
    const starBtns = screen.getAllByRole("button", { name: /星标/ })
    await user.click(starBtns[0])
    expect(handle).toHaveBeenCalledWith("1")
  })

  it("calls onSearch when typing in search input", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<InboxList items={items} onSearch={handle} />)
    const input = screen.getByPlaceholderText("搜索邮件...")
    await user.type(input, "Alice")
    expect(handle).toHaveBeenCalled()
  })

  it("applies selected style when item is selected", () => {
    const { container } = render(<InboxList items={items} selected="1" />)
    const root = container.querySelector('[data-slot="inbox-list"]')
    expect(root).toBeInTheDocument()
  })

  it("renders empty state when no items match", async () => {
    const user = userEvent.setup()
    render(<InboxList items={items} />)
    const input = screen.getByPlaceholderText("搜索邮件...")
    await user.type(input, "zzz-no-match")
    expect(screen.getByText("收件箱为空")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(
      <InboxList items={items} className="custom-inbox" />,
    )
    const root = container.querySelector('[data-slot="inbox-list"]')
    expect(root?.className).toContain("custom-inbox")
  })
})
