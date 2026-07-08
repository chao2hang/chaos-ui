import type { Meta, StoryObj } from "@storybook/react";
import { ChartFrame } from "@/components/business/charts/chart-frame";

const meta: Meta<typeof ChartFrame> = {
  title: "Business/ChartFrame",
  component: ChartFrame,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
