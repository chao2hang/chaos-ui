import type { Meta, StoryObj } from "@storybook/react";
import { Direction } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof Direction> = {
  title: "Components/Direction",
  component: Direction,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
