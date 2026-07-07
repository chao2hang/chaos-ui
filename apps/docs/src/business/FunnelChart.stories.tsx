import type { Meta, StoryObj } from "@storybook/react";
import { FunnelChart } from "@/components/business/charts/funnel-chart";

const meta = {
  title: "Business/FunnelChart",
  component: FunnelChart,
  tags: ["autodocs"],
} satisfies Meta<typeof FunnelChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
