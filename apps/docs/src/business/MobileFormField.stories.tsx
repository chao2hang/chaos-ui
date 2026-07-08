import type { Meta, StoryObj } from "@storybook/react";
import { MobileFormField } from "@/components/business/mobile-form-field";

const meta: Meta<typeof MobileFormField> = {
  title: "Business/MobileFormField",
  component: MobileFormField,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
