import type { Meta, StoryObj } from "@storybook/react";
import { BarChart } from "@/components/business/bar-chart";

const meta = {
  title: "Business/BarChart",
  component: BarChart,
  tags: ["autodocs"],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
