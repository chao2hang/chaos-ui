import type { Meta, StoryObj } from "@storybook/react"
import { Watermark } from "@/components/business/watermark"

const meta = {
  title: "Business/Watermark",
  component: Watermark,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Watermark>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="relative h-72 overflow-hidden rounded-md border bg-muted/30">
      <p className="p-4 text-sm">这是被水印覆盖的内容区域。</p>
      <Watermark text="机密文档" />
    </div>
  ),
}

export const CustomStyle: Story = {
  render: () => (
    <div className="relative h-72 overflow-hidden rounded-md border bg-background p-4">
      <p className="text-sm">自定义旋转、字体大小、颜色和不透明度。</p>
      <Watermark
        text="内部资料"
        rotate={-30}
        fontSize={20}
        opacity={0.12}
        color="#6366f1"
        gap={[140, 120]}
      />
    </div>
  ),
}

export const ContainerOnly: Story = {
  render: () => (
    <div className="relative h-72 w-full overflow-hidden rounded-md border">
      <p className="p-4 text-sm">只覆盖容器（非全屏）</p>
      <Watermark text="容器" fullPage={false} />
    </div>
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
