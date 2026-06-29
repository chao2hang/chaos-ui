import type { Meta, StoryObj } from "@storybook/react"
import { Gauge, RadialProgress } from "@/components/business/gauge"

const meta = {
  title: "Business/Gauge",
  component: Gauge,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof Gauge>

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    value: 72,
    label: "Budget pacing",
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Gauge value={42} label="Healthy" variant="success" />
      <Gauge value={68} label="Watch" variant="warning" />
      <Gauge value={91} label="Over pace" variant="destructive" />
    </div>
  ),
}

export const CustomRange: Story = {
  args: {
    min: 40,
    max: 140,
    value: 118,
    label: "Quality score",
    formatValue: (value: number) => `${value}/140`,
  },
}

export const RadialProgressSet: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <RadialProgress value={25} />
      <RadialProgress value={62} variant="warning" />
      <RadialProgress value={88} variant="success" />
    </div>
  ),
}

