import type { Meta, StoryObj } from "@storybook/react";
import { DonutChart } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof DonutChart> = {
  title: "Business/DonutChart",
  component: DonutChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
