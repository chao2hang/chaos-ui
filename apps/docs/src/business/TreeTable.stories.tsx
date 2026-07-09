import type { Meta, StoryObj } from "@storybook/react";
import { TreeTable } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof TreeTable> = {
  title: "Business/TreeTable",
  component: TreeTable,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
