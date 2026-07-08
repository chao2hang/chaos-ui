import type { Meta, StoryObj } from "@storybook/react";
import { MobileForm } from "@/components/business/mobile-form";

const meta: Meta<typeof MobileForm> = {
  title: "Business/MobileForm",
  component: MobileForm,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
