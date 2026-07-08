import type { Meta, StoryObj } from "@storybook/react";
import { MobileButton } from "@/components/business/mobile-button";

const meta: Meta<typeof MobileButton> = {
  title: "Business/MobileButton",
  component: MobileButton,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
