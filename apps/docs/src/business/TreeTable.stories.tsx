import type { Meta, StoryObj } from "@storybook/react";
import { TreeTable } from "@/components/business/tree-table";

const meta = {
  title: "Business/TreeTable",
  component: TreeTable,
  tags: ["autodocs"],
} satisfies Meta<typeof TreeTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
