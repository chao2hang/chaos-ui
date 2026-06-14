import type { Meta, StoryObj } from "@storybook/react";
import {
  DollarSignIcon,
  MousePointerClickIcon,
  TrendingDownIcon,
} from "@/components/ui/icons";
import { MetricTrend, Sparkline } from "@/components/business/metric-trend";

const meta = {
  title: "Business/MetricTrend",
  component: MetricTrend,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof MetricTrend>;

export default meta;
type Story = StoryObj;

export const Revenue: Story = {
  args: {
    label: "Revenue",
    value: 842300,
    format: "currency",
    change: 0.128,
    icon: <DollarSignIcon className="size-3.5" />,
    sparklineData: [20, 32, 28, 45, 52, 61, 74],
  },
};

export const DownIsGood: Story = {
  args: {
    label: "Cost per acquisition",
    value: 38.2,
    unit: "CNY",
    change: -0.074,
    trendDirection: "down-good",
    icon: <TrendingDownIcon className="size-3.5" />,
    sparklineData: [62, 58, 54, 49, 44, 41, 38],
  },
};

export const Loading: Story = {
  args: {
    label: "Click-through rate",
    value: 0.037,
    format: "percent",
    loading: true,
    icon: <MousePointerClickIcon className="size-3.5" />,
  },
};

export const SparklineOnly: Story = {
  render: () => (
    <div className="rounded-lg border p-4 text-success">
      <Sparkline data={[12, 18, 16, 24, 32, 29, 41]} width={160} height={48} />
    </div>
  ),
};
