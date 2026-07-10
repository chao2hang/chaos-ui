import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmDialog } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Business/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ConfirmDialog
      open={false}
      onOpenChange={() => {}}
      onConfirm={() => {}}
      loading={false}
      icon={null}
    />
  ),
};
