import type { Meta, StoryObj } from "@storybook/react";
import { TaskProgress } from "@/components/business/task-progress";

const meta = {
  title: "Business/Approval/TaskProgress",
  component: TaskProgress,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { percent: 0, status: "In progress" },
} satisfies Meta<typeof TaskProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = {
  args: { percent: 45, status: "In progress", message: "3 of 7 steps completed" },
};

export const Complete: Story = {
  args: { percent: 100, status: "Done", message: "All steps completed" },
};

export const Pending: Story = {
  args: { percent: 0, status: "Pending", message: "Awaiting approval" },
};

export const Halfway: Story = {
  args: { percent: 50, status: "Processing" },
};
