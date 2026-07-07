import type { Meta, StoryObj } from "@storybook/react";
import { ChartSkeleton } from "@/components/business/chart-skeleton";

const meta = {
  title: "Business/ChartSkeleton",
  component: ChartSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof ChartSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
