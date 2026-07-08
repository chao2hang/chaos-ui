import type { Meta, StoryObj } from "@storybook/react";
import { ChartSkeleton } from "@/components/business/chart-skeleton";

const meta: Meta<typeof ChartSkeleton> = {
  title: "Business/ChartSkeleton",
  component: ChartSkeleton,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
