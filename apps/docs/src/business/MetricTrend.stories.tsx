import type { Meta, StoryObj } from "@storybook/react"
import { MetricTrend, Sparkline } from "@/components/business/metric-trend"
import { UsersIcon, DollarSignIcon, TrendingUpIcon } from "lucide-react"

const meta = {
  title: "Business/MetricTrend",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <MetricTrend
        label="活跃用户"
        value={12345}
        change={12.5}
        sparklineData={[10, 12, 11, 14, 15, 18, 17, 20, 22, 24]}
        icon={<UsersIcon className="size-3.5" />}
      />
      <MetricTrend
        label="收入"
        value={987654}
        format="currency"
        change={-3.2}
        trendDirection="down-good"
        sparklineData={[30, 28, 25, 26, 22, 20, 18, 17, 16, 15]}
        icon={<DollarSignIcon className="size-3.5" />}
      />
      <MetricTrend
        label="转化率"
        value={0.42}
        format="percent"
        change={0}
        icon={<TrendingUpIcon className="size-3.5" />}
      />
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <MetricTrend label="加载中" value={0} loading />
      <MetricTrend label="正常" value={1234} change={5.6} />
    </div>
  ),
}

export const SparklineExample: Story = {
  render: () => (
    <div className="flex items-end gap-6 text-success">
      <div>
        <div className="text-xs text-muted-foreground">上涨</div>
        <Sparkline data={[1, 3, 2, 4, 5, 6, 7, 8]} width={120} height={40} />
      </div>
      <div className="text-destructive">
        <div className="text-xs text-muted-foreground">下跌</div>
        <Sparkline data={[8, 7, 6, 4, 3, 2, 1, 0]} width={120} height={40} />
      </div>
    </div>
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
