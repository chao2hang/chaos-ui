import type { Meta, StoryObj } from "@storybook/react";
import { BulkImportWizard } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof BulkImportWizard> = {
  title: "Business/BulkImportWizard",
  component: BulkImportWizard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
