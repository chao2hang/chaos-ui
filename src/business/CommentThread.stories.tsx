import type { Meta, StoryObj } from "@storybook/react"
import { CommentThread, type Comment } from "@/components/business/comment-thread"

const meta = {
  title: "Business/CommentThread",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const baseComments: Comment[] = [
  {
    id: "1",
    author: { name: "李雷" },
    content: "这个版本的样式看起来不错，但建议把标题字体再放大一点。",
    timestamp: Date.now() - 3600_000,
    reactions: [
      { emoji: "👍", count: 3, reacted: true },
      { emoji: "🎉", count: 1 },
    ],
    replies: [
      { id: "1-1", author: { name: "韩梅梅" }, content: "同意，标题 18px 更合适。", timestamp: Date.now() - 1800_000 },
    ],
  },
  {
    id: "2",
    author: { name: "张伟" },
    content: "主色用 #6366f1 还是 #4f46e5？设计师确认一下。",
    timestamp: Date.now() - 600_000,
    reactions: [{ emoji: "👀", count: 2 }],
  },
]

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl">
      <CommentThread
        comments={baseComments}
        onReply={(pid, content) => console.info("reply", pid, content)}
        onReact={(cid, emoji) => console.info("react", cid, emoji)}
      />
    </div>
  ),
}

export const Nested: Story = {
  render: () => {
    const nested: Comment[] = [
      {
        id: "1",
        author: { name: "Alice" },
        content: "顶层评论",
        timestamp: Date.now() - 7200_000,
        replies: [
          {
            id: "1-1",
            author: { name: "Bob" },
            content: "一级回复",
            timestamp: Date.now() - 3600_000,
            replies: [
              {
                id: "1-1-1",
                author: { name: "Carol" },
                content: "二级回复",
                timestamp: Date.now() - 1800_000,
              },
            ],
          },
        ],
      },
    ]
    return (
      <div className="max-w-2xl">
        <CommentThread comments={nested} />
      </div>
    )
  },
}

export const ReadOnly: Story = {
  render: () => (
    <div className="max-w-2xl">
      <CommentThread comments={baseComments} />
    </div>
  ),
}

export const Empty: Story = {
  render: () => (
    <div className="max-w-2xl">
      <CommentThread comments={[]} />
    </div>
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
