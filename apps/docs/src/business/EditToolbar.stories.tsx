import type { Meta, StoryObj } from "@storybook/react";
import { EditToolbar } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof EditToolbar> = {
  title: "Business/EditToolbar",
  component: EditToolbar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <EditToolbar
      onSave={() => {}}
      onCancel={() => {}}
      onDelete={() => {}}
      extraActions={null}
    />
  ),
};
