import type { Meta, StoryObj } from "@storybook/react"
import {
  PresenceIndicators,
  type PresenceUser,
} from "@/components/business/presence-indicators"

const meta = {
  title: "Business/PresenceIndicators",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const users: PresenceUser[] = [
  { id: "1", name: "李雷", status: "online" },
  { id: "2", name: "韩梅梅", status: "online" },
  { id: "3", name: "张伟", status: "typing" },
  { id: "4", name: "王芳", status: "away" },
  { id: "5", name: "刘洋", status: "busy" },
  { id: "6", name: "陈晨", status: "offline", lastSeen: Date.now() - 86_400_000 },
  { id: "7", name: "周晓", status: "online" },
  { id: "8", name: "吴磊", status: "online" },
]

export const Default: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="text-sm font-medium">max=5（默认）</div>
        <PresenceIndicators users={users} />
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium">max=3</div>
        <PresenceIndicators users={users} max={3} />
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium">max=20（不显示溢出）</div>
        <PresenceIndicators users={users} max={20} />
      </div>
    </div>
  ),
}

export const WithAvatars: Story = {
  render: () => {
    const withAvatars: PresenceUser[] = users.slice(0, 4).map((u, i) => ({
      ...u,
      avatar: `https://i.pravatar.cc/64?img=${i + 1}`,
    }))
    return (
      <div className="space-y-2">
        <div className="text-sm font-medium">带头像</div>
        <PresenceIndicators users={withAvatars} />
      </div>
    )
  },
}

export const AllOffline: Story = {
  render: () => {
    const allOffline: PresenceUser[] = users.map((u) => ({ ...u, status: "offline" }))
    return (
      <div className="space-y-2">
        <div className="text-sm font-medium">全部离线（无状态点）</div>
        <PresenceIndicators users={allOffline} />
      </div>
    )
  },
}

export const InContext: Story = {
  render: () => (
    <div className="max-w-md space-y-2 rounded-md border bg-card p-4">
      <div className="text-sm font-medium">协作面板</div>
      <p className="text-xs text-muted-foreground">当前在线 5 人，2 人正在输入</p>
      <PresenceIndicators users={users} max={8} />
    </div>
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
