import type { Meta, StoryObj } from "@storybook/react";
import { BillTodoList } from "@/components/business/bill-todo-list";

const items = [
  { id: "1", title: "Approve invoice INV-001", type: "approval", deadline: "2024-07-20" },
  { id: "2", title: "Review contract CT-0042", type: "review", deadline: "2024-07-22" },
  { id: "3", title: "Submit expense report", type: "submit" },
];

const meta = {
  title: "Business/Finance/BillTodoList",
  component: BillTodoList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { items: [] },
} satisfies Meta<typeof BillTodoList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items },
};

export const Empty: Story = {};

export const WithClick: Story = {
  args: {
    items,
    onItemClick: (id) => { void id; },
  },
};
