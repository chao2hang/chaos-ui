import type { Meta, StoryObj } from "@storybook/react";
import { AreaChart } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof AreaChart> = {
  title: "Business/AreaChart",
  component: AreaChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
