import type { Meta, StoryObj } from "@storybook/react";
import { BatchPrintDialog } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof BatchPrintDialog> = {
  title: "Business/BatchPrintDialog",
  component: BatchPrintDialog,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
