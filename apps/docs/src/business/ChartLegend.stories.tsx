import type { Meta, StoryObj } from "@storybook/react";
import { ChartLegend } from "@/components/business/chart-legend";

const meta: Meta<typeof ChartLegend> = {
  title: "Business/ChartLegend",
  component: ChartLegend,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
