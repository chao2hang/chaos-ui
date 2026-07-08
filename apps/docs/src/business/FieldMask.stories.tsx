import type { Meta, StoryObj } from "@storybook/react";
import { FieldMask } from "@/components/business/field-mask";

const meta: Meta<typeof FieldMask> = {
  title: "Business/FieldMask",
  component: FieldMask,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
