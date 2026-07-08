import type { Meta, StoryObj } from "@storybook/react";
import { PieChart } from "@/components/business/chart";

const meta: Meta<typeof PieChart> = {
  title: "Business/PieChart",
  component: PieChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
