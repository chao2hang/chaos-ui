import type { Meta, StoryObj } from "@storybook/react";
import { AreaChart } from "@/components/business/area-chart";

const meta = {
  title: "Business/Charts/AreaChart",
  component: AreaChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof AreaChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Sample data                                                               */
/* -------------------------------------------------------------------------- */

const weekLabels = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const weekValues = [12, 28, 18, 45, 32, 60, 48];

const monthLabels = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];
const monthValues = [
  120, 180, 150, 210, 190, 260, 240, 300, 280, 320, 290, 350,
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default weekly traffic with the component's built-in data. */
export const Default: Story = {};

/** Custom weekly data with a brand-colored stroke. */
export const WeeklyTraffic: Story = {
  args: {
    data: weekValues,
    labels: weekLabels,
    color: "var(--brand-500)",
    height: 200,
  },
};

/** Annual revenue trend with 12 data points. */
export const AnnualRevenue: Story = {
  args: {
    data: monthValues,
    labels: monthLabels,
    color: "var(--chart-1)",
    height: 220,
  },
};

/** Minimal sparkline-like area with fewer points. */
export const Minimal: Story = {
  args: {
    data: [4, 8, 6, 12, 10, 14],
    labels: ["A", "B", "C", "D", "E", "F"],
    color: "var(--success)",
    height: 120,
  },
};
