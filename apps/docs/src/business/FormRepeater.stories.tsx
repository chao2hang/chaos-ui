import type { Meta, StoryObj } from "@storybook/react";
import { FormRepeater } from "@/components/business/form/form-repeater";

const meta: Meta<typeof FormRepeater> = {
  title: "Business/FormRepeater",
  component: FormRepeater,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
