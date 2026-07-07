import type { Meta, StoryObj } from "@storybook/react";
import { ChartTooltip } from "@/components/business/chart-tooltip";

const meta = {
  title: "Business/ChartTooltip",
  component: ChartTooltip,
  tags: ["autodocs"],
} satisfies Meta<typeof ChartTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
