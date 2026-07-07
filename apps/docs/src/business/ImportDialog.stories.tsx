import type { Meta, StoryObj } from "@storybook/react";
import { ImportDialog } from "@/components/business/import-dialog";

const meta = {
  title: "Business/ImportDialog",
  component: ImportDialog,
  tags: ["autodocs"],
} satisfies Meta<typeof ImportDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
