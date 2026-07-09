import type { Meta, StoryObj } from "@storybook/react";
import { BillTodoList } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof BillTodoList> = {
  title: "Business/BillTodoList",
  component: BillTodoList,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
