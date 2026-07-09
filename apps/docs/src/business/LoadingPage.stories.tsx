import type { Meta, StoryObj } from "@storybook/react"
import { LoadingPage, FullPageLoader } from "@chaos_team/chaos-ui/business"

const meta = {
  title: "Business/LoadingPage",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="rounded-md border">
      <LoadingPage title="加载中..." description="请稍候片刻" />
    </div>
  ),
}

export const Dots: Story = {
  render: () => (
    <div className="rounded-md border">
      <LoadingPage title="正在准备数据" variant="dots" />
    </div>
  ),
}

export const Pulse: Story = {
  render: () => (
    <div className="rounded-md border">
      <LoadingPage title="同步中" variant="pulse" />
    </div>
  ),
}

export const FullPageExample: Story = {
  render: () => (
    <div className="relative h-72 overflow-hidden rounded-md border">
      <FullPageLoader>
        <div className="p-4 text-sm">背后的内容（半透明）</div>
      </FullPageLoader>
    </div>
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
