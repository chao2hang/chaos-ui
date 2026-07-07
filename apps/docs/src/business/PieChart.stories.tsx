import type { Meta, StoryObj } from "@storybook/react";
import { PieChart } from "@/components/business/chart";

const meta = {
  title: "Business/PieChart",
  component: PieChart,
  tags: ["autodocs"],
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
