import type { Meta, StoryObj } from "@storybook/react";
import { ApprovalActionBar } from "@/components/business/approval-action-bar";

const meta = {
  title: "Business/Approval/ApprovalActionBar",
  component: ApprovalActionBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ApprovalActionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { loading: true },
};

export const WithStatus: Story = {
  args: {
    status: "Approved",
    onApprove: () => {},
    onReject: () => {},
  },
};

export const AllHandlers: Story = {
  args: {
    onApprove: () => {},
    onReject: () => {},
    onTransfer: () => {},
    status: "Pending",
  },
};
