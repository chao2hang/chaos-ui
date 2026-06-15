import type { Meta, StoryObj } from "@storybook/react"
import { InboxList, type InboxItem } from "@/components/business/inbox-list"
import { useState } from "react"

const meta = {
  title: "Business/InboxList",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const items: InboxItem[] = [
  {
    id: "1",
    from: { name: "Alice Chen" },
    subject: "Q1 OKR 评审会议纪要",
    preview: "请查收附件中的会议纪要，重点关注第二章节...",
    timestamp: Date.now() - 600_000,
    read: false,
    starred: true,
    labels: ["工作", "重要"],
  },
  {
    id: "2",
    from: { name: "Bob Wang" },
    subject: "代码审查请求：#1234",
    preview: "麻烦尽快 review，下班前合入",
    timestamp: Date.now() - 3_600_000,
    read: false,
    labels: ["代码"],
  },
  {
    id: "3",
    from: { name: "Charlie Liu" },
    subject: "团建通知：下周五",
    preview: "活动地点：杭州西湖，集合 9:00",
    timestamp: Date.now() - 86_400_000,
    read: true,
  },
  {
    id: "4",
    from: { name: "Diana Zhang" },
    subject: "新功能提案",
    timestamp: Date.now() - 7 * 86_400_000,
    read: true,
  },
]

export const Default: Story = {
  render: () => (
    <div className="h-[480px] w-[420px]">
      <InboxList
        items={items}
        onSelect={(id) => console.info("select", id)}
        onStar={(id) => console.info("star", id)}
      />
    </div>
  ),
}

export const WithSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState("2")
    return (
      <div className="h-[480px] w-[420px]">
        <InboxList
          items={items}
          selected={selected}
          onSelect={setSelected}
          onStar={(id) => console.info("star", id)}
        />
      </div>
    )
  },
}

export const AllRead: Story = {
  render: () => (
    <div className="h-[480px] w-[420px]">
      <InboxList items={items.map((i) => ({ ...i, read: true }))} />
    </div>
  ),
}

export const Empty: Story = {
  render: () => (
    <div className="h-[480px] w-[420px]">
      <InboxList items={[]} />
    </div>
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
