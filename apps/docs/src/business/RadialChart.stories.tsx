import type { Meta, StoryObj } from "@storybook/react";
import { RadialChart } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof RadialChart> = {
  title: "Business/RadialChart",
  component: RadialChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
