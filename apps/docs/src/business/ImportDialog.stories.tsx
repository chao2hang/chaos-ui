import type { Meta, StoryObj } from "@storybook/react";
import { ImportDialog } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ImportDialog> = {
  title: "Business/ImportDialog",
  component: ImportDialog,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ImportDialog
      open={false}
      onOpenChange={() => {}}
      onImport={() => {}}
      templateUrl={"https://placehold.co/400x300/e2e8f0/64748b?text=Image"}
    />
  ),
};
