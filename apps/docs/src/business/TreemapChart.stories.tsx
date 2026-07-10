import type { Meta, StoryObj } from "@storybook/react";
import { TreemapChart } from "@/components/business/charts/treemap-chart";

const meta: Meta<typeof TreemapChart> = {
  title: "Business/TreemapChart",
  component: TreemapChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TreemapChart loading={false} />,
};
