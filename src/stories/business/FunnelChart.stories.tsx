import type { Meta, StoryObj } from "@storybook/react";
import { FunnelChart } from "@/components/business/funnel-chart";

const meta = {
  title: "Business/Charts/FunnelChart",
  component: FunnelChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof FunnelChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Standard marketing conversion funnel. */
export const MarketingFunnel: Story = {
  args: {
    data: [
      { label: "曝光", value: 10000, color: "var(--chart-1)" },
      { label: "点击", value: 4200, color: "var(--chart-2)" },
      { label: "注册", value: 1850, color: "var(--chart-3)" },
      { label: "下单", value: 720, color: "var(--chart-4)" },
      { label: "复购", value: 280, color: "var(--chart-5)" },
    ],
  },
};

/** Recruitment pipeline funnel with custom colors. */
export const RecruitmentPipeline: Story = {
  args: {
    data: [
      { label: "投递", value: 500, color: "var(--info)" },
      { label: "初筛", value: 200, color: "var(--brand-500)" },
      { label: "面试", value: 80, color: "var(--warning)" },
      { label: "Offer", value: 25, color: "var(--success)" },
      { label: "入职", value: 18, color: "var(--brand-700)" },
    ],
  },
};

/** Compact 3-step funnel for quick conversion visualizations. */
export const SimpleFunnel: Story = {
  args: {
    data: [
      { label: "访问", value: 1000 },
      { label: "加购", value: 320 },
      { label: "支付", value: 150 },
    ],
  },
};
