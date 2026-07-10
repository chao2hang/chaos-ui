import type { Meta, StoryObj } from "@storybook/react";
import { SwipeActions } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof SwipeActions> = {
  title: "Business/MobileSwipeActions",
  component: SwipeActions,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SwipeActions
      onSwipeLeft={() => {}}
      onSwipeRight={() => {}}
      onSwipeUp={() => {}}
      onSwipeDown={() => {}}
      disabled={false}
      leftAction={{}}
      children={"内容"}
    />
  ),
};
