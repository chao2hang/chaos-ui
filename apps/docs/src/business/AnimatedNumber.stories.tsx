import type { Meta, StoryObj } from "@storybook/react"
import { AnimatedNumber } from "@/components/business/animated-number"

const meta: Meta<typeof AnimatedNumber> = {
  title: "Business/AnimatedNumber",
  component: AnimatedNumber,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 text-3xl font-bold tabular-nums">
      <div>
        <div className="text-xs font-normal text-muted-foreground">收入</div>
        <AnimatedNumber value={1234567} duration={2000} prefix="¥" />
      </div>
      <div>
        <div className="text-xs font-normal text-muted-foreground">增长</div>
        <AnimatedNumber value={42.7} decimals={1} suffix="%" duration={1500} />
      </div>
      <div>
        <div className="text-xs font-normal text-muted-foreground">用户数</div>
        <AnimatedNumber value={9805} duration={1800} />
      </div>
    </div>
  ),
}

export const WithFormatter: Story = {
  render: () => (
    <div className="text-3xl font-bold tabular-nums">
      <AnimatedNumber
        value={987654}
        duration={2000}
        format={(v) => v.toLocaleString("en-US")}
      />
    </div>
  ),
}

export const SmallValues: Story = {
  render: () => (
    <div className="flex gap-4 text-xl tabular-nums">
      <AnimatedNumber value={12} />
      <AnimatedNumber value={0.5} decimals={2} />
      <AnimatedNumber value={100} prefix="+" suffix="%" />
    </div>
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
