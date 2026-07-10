import type { Meta, StoryObj } from "@storybook/react";
import { FunnelChart } from "@/components/business/charts/funnel-chart";

const meta: Meta<typeof FunnelChart> = {
  title: "Business/FunnelChart",
  component: FunnelChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FunnelChart loading={false} />,
};
