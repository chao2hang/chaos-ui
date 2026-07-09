import type { Meta, StoryObj } from "@storybook/react";
import { LineChart } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof LineChart> = {
  title: "Business/LineChart",
  component: LineChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
