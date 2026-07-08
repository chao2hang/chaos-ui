import type { Meta, StoryObj } from "@storybook/react";
import { MobileBottomNav } from "@/components/business/mobile-bottom-nav";

const meta: Meta<typeof MobileBottomNav> = {
  title: "Business/MobileBottomNav",
  component: MobileBottomNav,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
