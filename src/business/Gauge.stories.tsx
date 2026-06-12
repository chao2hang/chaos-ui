import type { Meta, StoryObj } from "@storybook/react"
import { Gauge, RadialProgress } from "@/components/business/gauge"

const meta = {
  title: "Business/Gauge",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <Gauge value={68} label="CPU 使用率" />
      <Gauge value={42} label="内存" variant="success" />
      <Gauge value={88} label="磁盘" variant="warning" />
      <Gauge value={95} label="危险" variant="destructive" />
    </div>
  ),
}

export const CustomFormat: Story = {
  render: () => (
    <Gauge
      value={1234}
      min={0}
      max={2000}
      label="下载速度"
      formatValue={(v) => `${v.toFixed(0)} KB/s`}
    />
  ),
}

export const NoLabel: Story = {
  render: () => (
    <div className="flex gap-6">
      <Gauge value={30} showValue={false} />
      <Gauge value={75} showValue={false} />
    </div>
  ),
}

export const RadialExample: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <RadialProgress value={25} />
      <RadialProgress value={50} variant="success" />
      <RadialProgress value={75} variant="warning" />
      <RadialProgress value={90} variant="destructive" />
    </div>
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
