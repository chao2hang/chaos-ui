import type { Meta, StoryObj } from "@storybook/react";
import { EditToolbar } from "@/components/business/edit-toolbar";

const meta: Meta<typeof EditToolbar> = {
  title: "Business/EditToolbar",
  component: EditToolbar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
