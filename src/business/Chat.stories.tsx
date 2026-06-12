import type { Meta, StoryObj } from "@storybook/react"
import { ChatMessageList, ChatComposer } from "@/components/business/chat"
import { useState } from "react"

const meta = {
  title: "Business/Chat",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const initialMessages = [
  { id: "1", author: { name: "李雷" }, content: "下午开会吗？", timestamp: Date.now() - 600_000 },
  { id: "2", author: { name: "韩梅梅" }, content: "开，3 点 5F 会议室。", timestamp: Date.now() - 500_000 },
  { id: "3", author: { name: "李雷" }, content: "好的，我准备一下 Q1 报告。", timestamp: Date.now() - 400_000, read: true },
  { id: "4", author: { name: "system" }, content: "韩梅梅 创建了新文档《Q1 OKR》", timestamp: Date.now() - 300_000, type: "system" as const },
  { id: "5", author: { name: "张伟" }, content: "我也来。", timestamp: Date.now() - 100_000 },
]

export const Default: Story = {
  render: () => (
    <div className="max-w-md rounded-md border">
      <div className="h-72 overflow-y-auto">
        <ChatMessageList messages={initialMessages} />
      </div>
      <ChatComposer onSend={(content) => console.info("send", content)} />
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [list, setList] = useState(initialMessages)
    return (
      <div className="max-w-md rounded-md border">
        <div className="h-72 overflow-y-auto">
          <ChatMessageList messages={list} currentUserId="me" />
        </div>
        <ChatComposer
          placeholder="说点什么..."
          onSend={(content) =>
            setList((prev) => [
              ...prev,
              {
                id: String(prev.length + 1),
                author: { name: "me" },
                content,
                timestamp: Date.now(),
              },
            ])
          }
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="max-w-md rounded-md border">
      <div className="h-48 overflow-y-auto">
        <ChatMessageList messages={initialMessages} />
      </div>
      <ChatComposer disabled />
    </div>
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
