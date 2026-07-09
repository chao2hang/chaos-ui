import type { Meta, StoryObj } from "@storybook/react";
import { MobileSwipeCard } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobileSwipeCard> = {
  title: "Mobile/MobileSwipeCard",
  component: MobileSwipeCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
