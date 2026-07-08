import type { Meta, StoryObj } from "@storybook/react";
import { HeatmapChart } from "@/components/business/charts/heatmap-chart";

const meta: Meta<typeof HeatmapChart> = {
  title: "Business/HeatmapChart",
  component: HeatmapChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
