import type { Meta, StoryObj } from "@storybook/react";
import { HeatmapChart } from "@/components/business/charts/heatmap-chart";

const meta = {
  title: "Business/HeatmapChart",
  component: HeatmapChart,
  tags: ["autodocs"],
} satisfies Meta<typeof HeatmapChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
