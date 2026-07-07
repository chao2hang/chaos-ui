import type { Meta, StoryObj } from "@storybook/react";
import { FormRepeater } from "@/components/business/form/form-repeater";

const meta = {
  title: "Business/FormRepeater",
  component: FormRepeater,
  tags: ["autodocs"],
} satisfies Meta<typeof FormRepeater>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
