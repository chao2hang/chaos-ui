import type { Meta, StoryObj } from "@storybook/react"
import { FeatureGate, useFeatureFlags } from "@/components/business/feature-gate"

const meta = {
  title: "Business/FeatureGate",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="max-w-md space-y-3">
      <div className="rounded-md border bg-card p-4">
        <div className="mb-2 text-sm font-medium">新仪表盘（new-dashboard · 启用）</div>
        <FeatureGate flag="new-dashboard">
          <div className="rounded bg-primary/10 p-3 text-sm text-primary">
            已启用新版仪表盘体验
          </div>
        </FeatureGate>
      </div>
      <div className="rounded-md border bg-card p-4">
        <div className="mb-2 text-sm font-medium">AI 助手（ai-assistant · 关闭）</div>
        <FeatureGate
          flag="ai-assistant"
          fallback={<div className="rounded bg-muted p-3 text-sm text-muted-foreground">该功能尚未对你的账号开放</div>}
        >
          <div className="rounded bg-primary/10 p-3 text-sm text-primary">
            AI 助手已启用
          </div>
        </FeatureGate>
      </div>
    </div>
  ),
}

export const WithFallback: Story = {
  render: () => (
    <div className="max-w-md">
      <FeatureGate
        flag="ai-assistant"
        fallback={
          <div className="rounded-md border border-dashed p-6 text-center">
            <div className="mb-1 text-sm font-medium">功能未启用</div>
            <div className="text-xs text-muted-foreground">联系管理员开启 AI 助手</div>
          </div>
        }
      >
        <div className="rounded-md bg-primary/10 p-6 text-center text-sm text-primary">
          AI 助手内容
        </div>
      </FeatureGate>
    </div>
  ),
}

export const WithUserContext: Story = {
  render: () => (
    <div className="max-w-md">
      <FeatureGate
        flag="ai-assistant"
        userContext={{ userId: "user-123", email: "user@example.com" }}
        fallback={<div className="rounded bg-muted p-3 text-xs text-muted-foreground">未命中</div>}
      >
        <div className="rounded bg-primary/10 p-3 text-xs text-primary">命中（按 userId 灰度）</div>
      </FeatureGate>
    </div>
  ),
}

export const HookUsage: Story = {
  render: () => {
    const flags = useFeatureFlags()
    return (
      <div className="max-w-md rounded-md border bg-card p-4">
        <div className="mb-2 text-sm font-medium">useFeatureFlags 实时状态</div>
        <ul className="space-y-1 text-xs">
          {Object.entries(flags).map(([k, v]) => (
            <li key={k} className="flex justify-between">
              <span className="text-muted-foreground">{k}</span>
              <span className={v ? "text-success" : "text-muted-foreground"}>
                {v ? "on" : "off"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  },
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
