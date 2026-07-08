import type { Meta, StoryObj } from "@storybook/react";
import { MobileSwipeCard } from "@/components/mobile/mobile-swipe-card";

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
