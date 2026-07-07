import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmDialog } from "@/components/business/confirm-dialog";

const meta = {
  title: "Business/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
