import type { Meta, StoryObj } from "@storybook/react";
import { ChartTooltip } from "@/components/business/chart-tooltip";

const meta: Meta<typeof ChartTooltip> = {
  title: "Business/ChartTooltip",
  component: ChartTooltip,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
