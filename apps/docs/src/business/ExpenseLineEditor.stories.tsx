import type { Meta, StoryObj } from "@storybook/react";
import { ExpenseLineEditor } from "@/components/business/expense-line-editor";

const meta = {
  title: "Business/ExpenseLineEditor",
  component: ExpenseLineEditor,
  tags: ["autodocs"],
} satisfies Meta<typeof ExpenseLineEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
