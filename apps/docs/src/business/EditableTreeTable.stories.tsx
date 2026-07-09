import type { Meta, StoryObj } from "@storybook/react";
import { EditableTreeTable } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof EditableTreeTable> = {
  title: "Business/EditableTreeTable",
  component: EditableTreeTable,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
