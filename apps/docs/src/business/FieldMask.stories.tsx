import type { Meta, StoryObj } from "@storybook/react";
import { FieldMask } from "@/components/business/field-mask";

const meta = {
  title: "Business/FieldMask",
  component: FieldMask,
  tags: ["autodocs"],
} satisfies Meta<typeof FieldMask>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
