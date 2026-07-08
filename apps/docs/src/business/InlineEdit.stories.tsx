import type { Meta, StoryObj } from "@storybook/react";
import { InlineEdit } from "@/components/business/inline-edit";

const meta: Meta<typeof InlineEdit> = {
  title: "Business/InlineEdit",
  component: InlineEdit,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
