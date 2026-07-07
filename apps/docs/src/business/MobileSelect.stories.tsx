import type { Meta, StoryObj } from "@storybook/react";
import { MobileSelect } from "@/components/business/mobile-select";

const meta = {
  title: "Business/MobileSelect",
  component: MobileSelect,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
