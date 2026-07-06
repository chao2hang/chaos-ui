import type { Meta, StoryObj } from "@storybook/react";
import { WaterfallChart } from "@/components/business/waterfall-chart";

const meta = {
  title: "Business/Charts/WaterfallChart",
  component: WaterfallChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof WaterfallChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default 5-step P&L waterfall. */
export const Default: Story = {};

/** Detailed revenue-to-net-income breakdown. */
export const NetIncomeBreakdown: Story = {
  args: {
    data: [
      { label: "总收入", value: 1000, absolute: true },
      { label: "销售成本", value: -420 },
      { label: "毛利润", value: 580, absolute: true },
      { label: "运营支出", value: -180 },
      { label: "税费", value: -95 },
      { label: "净利润", value: 305, absolute: true },
    ],
    height: 260,
  },
};

/** Budget variance analysis — all deltas, no absolute bookends. */
export const BudgetVariance: Story = {
  args: {
    data: [
      { label: "预算基线", value: 500, absolute: true },
      { label: "人员", value: -30 },
      { label: "工具", value: 15 },
      { label: "培训", value: -12 },
      { label: "差旅", value: -8 },
      { label: "实际", value: 465, absolute: true },
    ],
  },
};

/** Compact waterfall for dashboard tiles. */
export const Compact: Story = {
  args: {
    data: [
      { label: "起", value: 100, absolute: true },
      { label: "增", value: 30 },
      { label: "减", value: -20 },
      { label: "止", value: 110, absolute: true },
    ],
    height: 140,
  },
};
