import type { Meta, StoryObj } from "@storybook/react";
import { BarChart } from "@/components/business/bar-chart";

const meta = {
  title: "Business/Charts/BarChart",
  component: BarChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Sample data                                                               */
/* -------------------------------------------------------------------------- */

const monthlySales = [
  { label: "一月", value: 38 },
  { label: "二月", value: 52 },
  { label: "三月", value: 41 },
  { label: "四月", value: 67 },
  { label: "五月", value: 55 },
];

const quarterRevenue = [
  { label: "Q1", value: 320, color: "var(--chart-1)" },
  { label: "Q2", value: 450, color: "var(--chart-2)" },
  { label: "Q3", value: 380, color: "var(--chart-3)" },
  { label: "Q4", value: 520, color: "var(--chart-4)" },
];

const departmentHeadcount = [
  { label: "工程", value: 85 },
  { label: "产品", value: 32 },
  { label: "设计", value: 18 },
  { label: "运营", value: 24 },
  { label: "市场", value: 15 },
  { label: "人事", value: 8 },
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default monthly sales with auto-assigned palette colors. */
export const Default: Story = {
  args: {
    data: monthlySales,
  },
};

/** Vertical bars with custom chart-token colors per bar. */
export const CustomColors: Story = {
  args: {
    data: quarterRevenue,
    height: 220,
  },
};

/** Horizontal orientation — useful for long labels or rankings. */
export const Horizontal: Story = {
  args: {
    data: departmentHeadcount,
    orientation: "horizontal",
    height: 240,
  },
};

/** Compact bar chart for embedding inside cards. */
export const Compact: Story = {
  args: {
    data: [
      { label: "A", value: 10 },
      { label: "B", value: 25 },
      { label: "C", value: 18 },
    ],
    height: 120,
  },
};

/** Vertical hover tooltip (issue #22). */
export const HoverTooltip: Story = {
  args: {
    data: quarterRevenue,
    height: 220,
    showTooltip: true,
  },
};
