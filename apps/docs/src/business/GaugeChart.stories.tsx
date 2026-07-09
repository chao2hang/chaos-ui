import type { Meta, StoryObj } from "@storybook/react";
import { GaugeChart } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof GaugeChart> = {
  title: "Business/GaugeChart",
  component: GaugeChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
