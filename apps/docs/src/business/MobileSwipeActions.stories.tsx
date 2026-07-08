import type { Meta, StoryObj } from "@storybook/react";
import { SwipeActions } from "@/components/business/mobile-swipe-actions";

const meta: Meta<typeof SwipeActions> = {
  title: "Business/MobileSwipeActions",
  component: SwipeActions,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
