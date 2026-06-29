import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CommentThread, type Comment } from "./comment-thread"

const comments: Comment[] = [
  {
    id: "1",
    author: { name: "李雷" },
    content: "这是顶层评论",
    timestamp: Date.now() - 600_000,
    reactions: [
      { emoji: "👍", count: 2, reacted: true },
      { emoji: "🎉", count: 1 },
    ],
    replies: [
      {
        id: "1-1",
        author: { name: "韩梅梅" },
        content: "这是回复",
        timestamp: Date.now() - 300_000,
      },
    ],
  },
  {
    id: "2",
    author: { name: "张伟" },
    content: "第二条评论",
    timestamp: Date.now(),
  },
]

describe("CommentThread", () => {
  it("renders all top-level comments", () => {
    render(<CommentThread comments={comments} />)
    expect(screen.getByText("这是顶层评论")).toBeInTheDocument()
    expect(screen.getByText("第二条评论")).toBeInTheDocument()
  })

  it("renders author names and reactions", () => {
    render(<CommentThread comments={comments} />)
    expect(screen.getByText("李雷")).toBeInTheDocument()
    expect(screen.getByText("张伟")).toBeInTheDocument()
    expect(screen.getByText(/👍\s*2/)).toBeInTheDocument()
  })

  it("renders nested replies", () => {
    render(<CommentThread comments={comments} />)
    expect(screen.getByText("这是回复")).toBeInTheDocument()
    expect(screen.getByText("韩梅梅")).toBeInTheDocument()
  })

  it("applies data-slot attribute and custom className", () => {
    const { container } = render(
      <CommentThread comments={comments} className="custom-thread" />,
    )
    const root = container.querySelector('[data-slot="comment-thread"]')
    expect(root).toBeInTheDocument()
    expect(root?.className).toContain("custom-thread")
  })

  it("calls onReact when a reaction is clicked", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<CommentThread comments={comments} onReact={handle} />)
    const reaction = screen.getByText(/👍\s*2/)
    await user.click(reaction)
    expect(handle).toHaveBeenCalledWith("1", "👍")
  })

  it("calls onReply when reply is submitted", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<CommentThread comments={comments} onReply={handle} />)
    const replyButtons = screen.getAllByRole("button", { name: /回复/ })
    await user.click(replyButtons[0])
    const input = screen.getByPlaceholderText("回复...")
    await user.type(input, "我的回复")
    const sendButton = screen.getByRole("button", { name: "发送" })
    await user.click(sendButton)
    expect(handle).toHaveBeenCalledWith("1", "我的回复")
  })
})
