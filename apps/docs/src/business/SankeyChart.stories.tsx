import type { Meta, StoryObj } from "@storybook/react";
import { SankeyChart } from "@/components/business/charts/sankey-chart";

const meta: Meta<typeof SankeyChart> = {
  title: "Business/SankeyChart",
  component: SankeyChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SankeyChart loading={false} />,
};
