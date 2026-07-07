import type { Meta, StoryObj } from "@storybook/react";
import { ChartLegend } from "@/components/business/chart-legend";

const meta = {
  title: "Business/ChartLegend",
  component: ChartLegend,
  tags: ["autodocs"],
} satisfies Meta<typeof ChartLegend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
