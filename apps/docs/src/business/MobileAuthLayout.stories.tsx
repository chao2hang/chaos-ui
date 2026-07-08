import type { Meta, StoryObj } from "@storybook/react";
import { MobileAuthLayout } from "@/components/business/mobile-auth-layout";

const meta: Meta<typeof MobileAuthLayout> = {
  title: "Business/MobileAuthLayout",
  component: MobileAuthLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
