import type { Meta, StoryObj } from "@storybook/react";
import { MobileSelect } from "@/components/business/mobile-select";

const meta: Meta<typeof MobileSelect> = {
  title: "Business/MobileSelect",
  component: MobileSelect,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
