import type { Meta, StoryObj } from "@storybook/react"
import { SavedFilters, type SavedFilter } from "@chaos_team/chaos-ui/business"
import { useState } from "react"

const meta = {
  title: "Business/SavedFilters",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const seed: SavedFilter[] = [
  {
    id: "1",
    name: "今日订单",
    filters: { date: "today", status: "paid" },
    createdAt: "2026-01-10",
  },
  {
    id: "2",
    name: "重要客户",
    filters: { priority: "high" },
    isPinned: true,
    createdAt: "2026-01-12",
  },
  {
    id: "3",
    name: "未支付订单",
    filters: { status: "unpaid" },
    createdAt: "2026-01-15",
  },
  {
    id: "4",
    name: "上月数据",
    filters: { date: "last-month" },
    createdAt: "2025-12-30",
  },
]

export const Default: Story = {
  render: () => (
    <SavedFilters
      filters={seed}
      activeId="1"
      onApply={(id) => console.info("apply", id)}
      onSave={(name) => console.info("save", name)}
      onDelete={(id) => console.info("delete", id)}
      onPin={(id) => console.info("pin", id)}
    />
  ),
}

export const Interactive: Story = {
  render: () => {
    const [list, setList] = useState(seed)
    const [active, setActive] = useState("2")
    return (
      <SavedFilters
        filters={list}
        activeId={active}
        onApply={setActive}
        onSave={(name) =>
          setList((prev) => [
            ...prev,
            {
              id: String(prev.length + 1),
              name,
              filters: {},
              createdAt: new Date().toISOString(),
            },
          ])
        }
        onDelete={(id) => setList((prev) => prev.filter((f) => f.id !== id))}
        onPin={(id) =>
          setList((prev) =>
            prev.map((f) => (f.id === id ? { ...f, isPinned: !f.isPinned } : f)),
          )
        }
      />
    )
  },
}

export const ReadOnly: Story = {
  render: () => (
    <SavedFilters filters={seed} onApply={(id) => console.info("apply", id)} />
  ),
}

export const Empty: Story = {
  render: () => <SavedFilters filters={[]} onSave={(name) => console.info("save", name)} />,
}

export const CustomLabel: Story = {
  render: () => (
    <SavedFilters
      filters={seed}
      label="我的视图"
      onApply={(id) => console.info("apply", id)}
    />
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
