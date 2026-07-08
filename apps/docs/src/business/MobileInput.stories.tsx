import type { Meta, StoryObj } from "@storybook/react";
import { MobileInput } from "@/components/business/mobile-input";

const meta: Meta<typeof MobileInput> = {
  title: "Business/MobileInput",
  component: MobileInput,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
