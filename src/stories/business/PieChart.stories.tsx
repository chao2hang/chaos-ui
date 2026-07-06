import type { Meta, StoryObj } from "@storybook/react";
import { PieChart } from "@/components/business/pie-chart";

const meta = {
  title: "Business/Charts/PieChart",
  component: PieChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Sample data                                                               */
/* -------------------------------------------------------------------------- */

const channelData = [
  { label: "线上", value: 58, color: "var(--chart-1)" },
  { label: "线下", value: 32, color: "var(--chart-2)" },
  { label: "其他", value: 10, color: "var(--chart-3)" },
];

const budgetData = [
  { label: "研发", value: 450, color: "var(--brand-500)" },
  { label: "市场", value: 280, color: "var(--brand-600)" },
  { label: "运营", value: 200, color: "var(--brand-400)" },
  { label: "行政", value: 120, color: "var(--brand-700)" },
  { label: "其他", value: 80, color: "var(--brand-300)" },
];

const statusData = [
  { label: "已完成", value: 56, color: "var(--success)" },
  { label: "进行中", value: 28, color: "var(--info)" },
  { label: "已阻塞", value: 16, color: "var(--destructive)" },
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default pie chart with three channel segments. */
export const Default: Story = {
  args: {
    data: channelData,
  },
};

/** Five-segment budget allocation at a larger size. */
export const BudgetAllocation: Story = {
  args: {
    data: budgetData,
    size: 180,
  },
};

/** Status breakdown using semantic color tokens. */
export const StatusBreakdown: Story = {
  args: {
    data: statusData,
    size: 140,
  },
};

/** Minimal two-slice pie for binary comparisons. */
export const Binary: Story = {
  args: {
    data: [
      { label: "达标", value: 75, color: "var(--success)" },
      { label: "未达标", value: 25, color: "var(--muted-foreground)" },
    ],
    size: 120,
  },
};
