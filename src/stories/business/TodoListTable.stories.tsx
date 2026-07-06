import type { Meta, StoryObj } from "@storybook/react";
import { TodoListTable } from "@/components/business/todo-list-table";

interface TodoItem {
  id: string;
  title: string;
  completed?: boolean;
}

const items: TodoItem[] = [
  { id: "1", title: "Submit expense report" },
  { id: "2", title: "Approve leave request", completed: true },
  { id: "3", title: "Review Q3 budget" },
];

const meta = {
  title: "Business/Approval/TodoListTable",
  component: TodoListTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof TodoListTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items },
};

export const Empty: Story = {};

export const WithToggle: Story = {
  args: {
    items,
    onToggle: (id) => { void id; },
  },
};
