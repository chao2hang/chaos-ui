import type { Meta, StoryObj } from "@storybook/react";
import { MobileBottomNav } from "@/components/business/mobile-bottom-nav";

const meta = {
  title: "Business/MobileBottomNav",
  component: MobileBottomNav,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileBottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
