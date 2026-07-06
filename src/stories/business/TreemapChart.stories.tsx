import type { Meta, StoryObj } from "@storybook/react";
import { TreemapChart } from "@/components/business/treemap-chart";

const meta = {
  title: "Business/Charts/TreemapChart",
  component: TreemapChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof TreemapChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default 4-category spending treemap. */
export const Default: Story = {};

/** Detailed budget breakdown with custom colors. */
export const BudgetBreakdown: Story = {
  args: {
    data: [
      { name: "研发", value: 450, color: "var(--brand-500)" },
      { name: "市场", value: 280, color: "var(--brand-600)" },
      { name: "运营", value: 200, color: "var(--brand-400)" },
      { name: "行政", value: 120, color: "var(--brand-700)" },
      { name: "法务", value: 80, color: "var(--brand-300)" },
      { name: "其他", value: 60, color: "var(--muted-foreground)" },
    ],
  },
};

/** Storage usage distribution across departments. */
export const StorageUsage: Story = {
  args: {
    data: [
      { name: "工程部", value: 1200 },
      { name: "设计部", value: 680 },
      { name: "产品部", value: 420 },
      { name: "运营部", value: 350 },
      { name: "市场部", value: 280 },
      { name: "人事部", value: 120 },
      { name: "财务部", value: 90 },
    ],
  },
};

/** Minimal two-category treemap. */
export const Binary: Story = {
  args: {
    data: [
      { name: "已使用", value: 75, color: "var(--chart-1)" },
      { name: "可用", value: 25, color: "var(--muted)" },
    ],
  },
};
