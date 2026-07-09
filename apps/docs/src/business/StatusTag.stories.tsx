import type { Meta, StoryObj } from "@storybook/react";
import { StatusTag } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof StatusTag> = {
  title: "Business/StatusTag",
  component: StatusTag,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: { type: "select" },
      options: [
        "draft",
        "pending",
        "approved",
        "rejected",
        "completed",
        "cancelled",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "default"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Draft: Story = { args: { status: "draft" } };
export const Pending: Story = { args: { status: "pending" } };
export const Approved: Story = { args: { status: "approved" } };
export const Rejected: Story = { args: { status: "rejected" } };
export const Completed: Story = { args: { status: "completed" } };
export const Cancelled: Story = { args: { status: "cancelled" } };

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusTag status="draft" />
      <StatusTag status="pending" />
      <StatusTag status="approved" />
      <StatusTag status="rejected" />
      <StatusTag status="completed" />
      <StatusTag status="cancelled" />
    </div>
  ),
};
