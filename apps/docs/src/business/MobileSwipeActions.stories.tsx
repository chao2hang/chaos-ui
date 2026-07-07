import type { Meta, StoryObj } from "@storybook/react";
import { SwipeActions } from "@/components/business/mobile-swipe-actions";

const meta = {
  title: "Business/MobileSwipeActions",
  component: SwipeActions,
  tags: ["autodocs"],
} satisfies Meta<typeof SwipeActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
