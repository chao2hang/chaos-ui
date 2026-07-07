import type { Meta, StoryObj } from "@storybook/react";
import { EditableTreeTable } from "@/components/business/editable-tree-table";

const meta = {
  title: "Business/EditableTreeTable",
  component: EditableTreeTable,
  tags: ["autodocs"],
} satisfies Meta<typeof EditableTreeTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
