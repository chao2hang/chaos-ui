import type { Meta, StoryObj } from "@storybook/react";
import { ImportDialog } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ImportDialog> = {
  title: "Business/ImportDialog",
  component: ImportDialog,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
