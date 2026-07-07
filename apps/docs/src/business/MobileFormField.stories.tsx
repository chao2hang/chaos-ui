import type { Meta, StoryObj } from "@storybook/react";
import { MobileFormField } from "@/components/business/mobile-form-field";

const meta = {
  title: "Business/MobileFormField",
  component: MobileFormField,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileFormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
