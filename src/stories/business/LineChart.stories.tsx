import type { Meta, StoryObj } from "@storybook/react";
import { LineChart } from "@/components/business/line-chart";

const meta = {
  title: "Business/Charts/LineChart",
  component: LineChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Sample data                                                               */
/* -------------------------------------------------------------------------- */

const quarterLabels = ["Q1", "Q2", "Q3", "Q4", "Q5"];

const multiSeries = [
  { name: "营收", values: [20, 35, 28, 50, 44], color: "var(--chart-1)" },
  { name: "支出", values: [12, 22, 18, 30, 26], color: "var(--chart-3)" },
  { name: "利润", values: [8, 13, 10, 20, 18], color: "var(--chart-2)" },
];

const monthLabels = ["1月", "2月", "3月", "4月", "5月", "6月"];
const singleSeries = [
  { name: "活跃用户", values: [120, 180, 150, 210, 190, 260] },
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default single-series line with the component's built-in data. */
export const Default: Story = {};

/** Multi-series line chart comparing revenue, expenses, and profit. */
export const MultiSeries: Story = {
  args: {
    series: multiSeries,
    labels: quarterLabels,
    height: 200,
  },
};

/** Single series with monthly labels. */
export const MonthlyTrend: Story = {
  args: {
    series: singleSeries,
    labels: monthLabels,
    height: 180,
  },
};

/** Compact line chart suitable for dashboard widgets. */
export const Compact: Story = {
  args: {
    series: [
      {
        name: "延迟",
        values: [40, 35, 50, 42, 38, 45, 33],
        color: "var(--warning)",
      },
    ],
    labels: ["一", "二", "三", "四", "五", "六", "日"],
    height: 120,
  },
};
