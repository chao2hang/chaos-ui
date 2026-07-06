import type { Meta, StoryObj } from "@storybook/react";
import { TaskHistory } from "@/components/business/task-history";

const tasks = [
  { id: "1", type: "Review", status: "done", startTime: "09:30", endTime: "10:00" },
  { id: "2", type: "Approval", status: "done", startTime: "10:15", endTime: "10:45" },
  { id: "3", type: "Processing", status: "running", startTime: "11:00" },
  { id: "4", type: "Archive", status: "pending", startTime: "12:00" },
];

const meta = {
  title: "Business/Approval/TaskHistory",
  component: TaskHistory,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { tasks: [] },
} satisfies Meta<typeof TaskHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { tasks },
};

export const SingleTask: Story = {
  args: { tasks: tasks.slice(0, 1) },
};

export const Empty: Story = {};
