import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmDialog } from "@/components/business/confirm-dialog";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Business/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
