import type { Meta, StoryObj } from "@storybook/react";
import { ColorBoard } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ColorBoard> = {
  title: "Business/ColorBoard",
  component: ColorBoard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
