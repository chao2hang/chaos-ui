import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ChatMessageList, ChatComposer } from "./chat"

const messages = [
  { id: "1", author: { name: "Alice" }, content: "你好", timestamp: Date.now() },
  { id: "2", author: { name: "Bob" }, content: "在的", timestamp: Date.now() },
  { id: "3", author: { name: "system" }, content: "系统消息", timestamp: Date.now(), type: "system" as const },
]

describe("ChatMessageList", () => {
  it("renders all messages with author and content", () => {
    render(<ChatMessageList messages={messages} />)
    expect(screen.getByText("Alice")).toBeInTheDocument()
    expect(screen.getByText("Bob")).toBeInTheDocument()
    expect(screen.getByText("你好")).toBeInTheDocument()
    expect(screen.getByText("在的")).toBeInTheDocument()
  })

  it("renders system messages as centered text", () => {
    const { container } = render(<ChatMessageList messages={messages} />)
    expect(container.textContent).toContain("系统消息")
    const sysWrapper = container.querySelector('[data-slot="chat-message-list"]')
    expect(sysWrapper?.textContent).toContain("系统消息")
  })

  it("applies custom className and data-slot", () => {
    const { container } = render(
      <ChatMessageList messages={messages} className="custom-chat" />,
    )
    const list = container.querySelector('[data-slot="chat-message-list"]')
    expect(list).toBeInTheDocument()
    expect(list?.className).toContain("custom-chat")
  })
})

describe("ChatComposer", () => {
  it("renders input with default placeholder", () => {
    render(<ChatComposer />)
    expect(screen.getByPlaceholderText("输入消息...")).toBeInTheDocument()
  })

  it("uses custom placeholder", () => {
    render(<ChatComposer placeholder="说点什么..." />)
    expect(screen.getByPlaceholderText("说点什么...")).toBeInTheDocument()
  })

  it("calls onSend when clicking send button after typing", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<ChatComposer onSend={handle} />)
    const input = screen.getByPlaceholderText("输入消息...")
    await user.type(input, "hello world")
    const sendBtn = screen.getByRole("button", { name: "发送" })
    await user.click(sendBtn)
    expect(handle).toHaveBeenCalledWith("hello world")
  })

  it("sends on Enter key", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<ChatComposer onSend={handle} />)
    const input = screen.getByPlaceholderText("输入消息...")
    await user.type(input, "hi{enter}")
    expect(handle).toHaveBeenCalledWith("hi")
  })

  it("does not send empty or whitespace-only messages", async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<ChatComposer onSend={handle} />)
    const input = screen.getByPlaceholderText("输入消息...")
    await user.type(input, "   {enter}")
    expect(handle).not.toHaveBeenCalled()
  })

  it("disables input and send button when disabled", () => {
    render(<ChatComposer disabled />)
    const input = screen.getByPlaceholderText("输入消息...")
    expect(input).toBeDisabled()
    expect(screen.getByRole("button", { name: "发送" })).toBeDisabled()
  })
})
