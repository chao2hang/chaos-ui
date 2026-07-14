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

/**
 * Dashboard-style dual series (CUI-DASH-07 / #22).
 * Hover the plot for x-aligned tooltip + crosshair (订单 + 费用).
 */
export const DashboardSalesTrend: Story = {
  args: {
    series: [
      {
        name: "订单",
        values: [320000, 280000, 410000, 380000, 450000, 520000],
        color: "primary",
      },
      {
        name: "费用",
        values: [45000, 38000, 52000, 41000, 58000, 67000],
        color: "chart-2",
      },
    ],
    labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
    height: 260,
    gradient: true,
    showTooltip: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 720 }}>
        <Story />
      </div>
    ),
  ],
};

/** Static embed without hover chrome. */
export const TooltipDisabled: Story = {
  args: {
    data: weekValues,
    labels: weekLabels,
    height: 160,
    showTooltip: false,
  },
};
