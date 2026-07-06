import type { Meta, StoryObj } from "@storybook/react";
import { TaskListTable } from "@/components/business/task-list-table";

const tasks = [
  { id: "1", title: "Review design spec", status: "Done", priority: "High", assignee: "Alice", deadline: "Jul 15" },
  { id: "2", title: "Implement login", status: "In progress", priority: "Medium", assignee: "Bob", deadline: "Jul 18" },
  { id: "3", title: "Write tests", status: "Pending", priority: "Low", assignee: "Carol", deadline: "Jul 22" },
];

const meta = {
  title: "Business/Approval/TaskListTable",
  component: TaskListTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { tasks: [] },
} satisfies Meta<typeof TaskListTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { tasks },
};

export const SingleTask: Story = {
  args: { tasks: tasks.slice(0, 1) },
};

export const Empty: Story = {};
