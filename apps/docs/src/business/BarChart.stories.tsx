import type { Meta, StoryObj } from "@storybook/react";
import { BarChart } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof BarChart> = {
  title: "Business/BarChart",
  component: BarChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
