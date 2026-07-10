import type { Meta, StoryObj } from "@storybook/react";
import { ExpenseLineEditor } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ExpenseLineEditor> = {
  title: "Business/ExpenseLineEditor",
  component: ExpenseLineEditor,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ExpenseLineEditor onChange={() => {}} maxRows={100} />,
};
