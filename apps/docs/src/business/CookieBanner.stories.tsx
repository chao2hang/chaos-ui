import type { Meta, StoryObj } from "@storybook/react"
import { CookieBanner } from "@/components/business/cookie-banner"

const meta: Meta<typeof CookieBanner> = {
  title: "Business/CookieBanner",
  component: CookieBanner,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
  },
  render: (args) => (
    <div className="relative h-72 overflow-hidden rounded-md border bg-muted/20">
      <p className="p-4 text-sm">页面内容</p>
      <CookieBanner {...args} />
    </div>
  ),
}

export const WithPolicy: Story = {
  args: {
    open: true,
    policyUrl: "#privacy",
    policyText: "查看隐私政策",
  },
  render: (args) => (
    <div className="relative h-72 overflow-hidden rounded-md border bg-muted/20">
      <p className="p-4 text-sm">带隐私政策链接</p>
      <CookieBanner {...args} />
    </div>
  ),
}

export const TopPosition: Story = {
  args: {
    open: true,
    position: "top",
    title: "数据使用说明",
    description: "我们改进了 Cookie 策略，请确认是否继续。",
  },
  render: (args) => (
    <div className="relative h-72 overflow-hidden rounded-md border bg-muted/20">
      <p className="p-4 text-sm">顶部位置</p>
      <CookieBanner {...args} />
    </div>
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
