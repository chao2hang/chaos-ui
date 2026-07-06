import type { Meta, StoryObj } from "@storybook/react";
import { SankeyChart } from "@/components/business/sankey-chart";

const meta = {
  title: "Business/Charts/SankeyChart",
  component: SankeyChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof SankeyChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default source → target attribution flow. */
export const Default: Story = {};

/** Marketing attribution: channels → outcomes. */
export const MarketingAttribution: Story = {
  args: {
    flows: [
      { source: "搜索", target: "下单", value: 55 },
      { source: "搜索", target: "流失", value: 18 },
      { source: "广告", target: "下单", value: 42 },
      { source: "广告", target: "咨询", value: 22 },
      { source: "广告", target: "流失", value: 25 },
      { source: "直接", target: "下单", value: 30 },
      { source: "推荐", target: "下单", value: 18 },
      { source: "推荐", target: "咨询", value: 12 },
    ],
  },
};

/** Simple two-flow diagram. */
export const SimpleFlow: Story = {
  args: {
    flows: [
      { source: "输入 A", target: "输出", value: 60 },
      { source: "输入 B", target: "输出", value: 40 },
    ],
  },
};
