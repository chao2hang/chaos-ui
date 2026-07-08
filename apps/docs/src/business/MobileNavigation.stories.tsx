import type { Meta, StoryObj } from "@storybook/react";
import { MobileNavigation } from "@/components/business/mobile-navigation";

const meta: Meta<typeof MobileNavigation> = {
  title: "Business/MobileNavigation",
  component: MobileNavigation,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
