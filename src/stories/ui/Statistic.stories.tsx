import type { Meta, StoryObj } from "@storybook/react";
import { Statistic } from "@/components/ui/statistic";

const meta = {
  title: "Components/Statistic",
  component: Statistic,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Statistic>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default numeric statistic. */
export const Default: Story = {
  args: {
    title: "Active users",
    value: 18927,
  },
};

/** Currency with prefix and precision. */
export const Currency: Story = {
  args: {
    title: "Total revenue",
    value: 12834.5,
    prefix: "$",
    precision: 2,
    groupSeparator: ",",
  },
};

/** Percentage with suffix and trend. */
export const TrendUp: Story = {
  args: {
    title: "Monthly growth",
    value: 18.6,
    suffix: "%",
    precision: 1,
    trend: 4.2,
  },
};

/** Negative (downward) trend. */
export const TrendDown: Story = {
  args: {
    title: "Churn rate",
    value: 3.4,
    suffix: "%",
    precision: 1,
    trend: -1.1,
  },
};

/** Loading skeleton state. */
export const Loading: Story = {
  args: {
    title: "Fetching…",
    loading: true,
  },
};

/** Inverted trend color mode (down = good, e.g. error count). */
export const InvertedTrend: Story = {
  args: {
    title: "Error count",
    value: 12,
    trend: -8,
    trendMode: "invert",
  },
};
