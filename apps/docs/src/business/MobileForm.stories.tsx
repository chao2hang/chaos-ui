import type { Meta, StoryObj } from "@storybook/react";
import { MobileForm } from "@/components/business/mobile-form";

const meta = {
  title: "Business/MobileForm",
  component: MobileForm,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
