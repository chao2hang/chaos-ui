import type { Meta, StoryObj } from "@storybook/react";
import { MobileTextarea } from "@/components/business/mobile-textarea";

const meta = {
  title: "Business/MobileTextarea",
  component: MobileTextarea,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
