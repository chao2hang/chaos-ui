import type { Meta, StoryObj } from "@storybook/react"
import { ThemeToggle } from "@/components/business/theme-toggle"

const meta = {
  title: "Business/ThemeToggle",
  component: ThemeToggle,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">点击切换主题</p>
      <ThemeToggle />
    </div>
  ),
}

export const NoSystemOption: Story = {
  render: () => (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">不显示「跟随系统」选项</p>
      <ThemeToggle showSystem={false} />
    </div>
  ),
}

export const InToolbar: Story = {
  render: () => (
    <div className="flex items-center justify-between rounded-md border bg-card p-3">
      <span className="text-sm font-medium">应用标题</span>
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </div>
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
