import type { Meta, StoryObj } from "@storybook/react";
import { MobileNavigation } from "@/components/business/mobile-navigation";

const meta = {
  title: "Business/MobileNavigation",
  component: MobileNavigation,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
