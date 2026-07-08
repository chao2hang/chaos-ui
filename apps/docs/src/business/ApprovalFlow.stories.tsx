import type { Meta, StoryObj } from "@storybook/react";
import { ApprovalFlow } from "@/components/business/approval-flow";

const steps = [
  {
    id: "1",
    name: "直属经理审批",
    approver: { name: "王经理" },
    status: "approved" as const,
    timestamp: Date.now() - 86400_000,
    comment: "同意，符合规范",
  },
  {
    id: "2",
    name: "部门总监审批",
    approver: { name: "李总监" },
    status: "approved" as const,
    timestamp: Date.now() - 3600_000,
  },
  {
    id: "3",
    name: "财务复核",
    approver: { name: "陈财务" },
    status: "pending" as const,
  },
  {
    id: "4",
    name: "CEO 终批",
    approver: { name: "CEO" },
    status: "pending" as const,
  },
];

const rejectedSteps = [
  {
    id: "1",
    name: "直属经理审批",
    approver: { name: "王经理" },
    status: "approved" as const,
    timestamp: Date.now() - 86400_000,
  },
  {
    id: "2",
    name: "部门总监审批",
    approver: { name: "李总监" },
    status: "rejected" as const,
    timestamp: Date.now() - 3600_000,
    comment: "预算超标，请重新提交",
  },
  {
    id: "3",
    name: "财务复核",
    approver: { name: "陈财务" },
    status: "skipped" as const,
  },
];

const meta: Meta<typeof ApprovalFlow> = {
  title: "Business/ApprovalFlow",
  component: ApprovalFlow,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps,
    currentStep: 2,
  },
};

export const Rejected: Story = {
  args: {
    steps: rejectedSteps,
    currentStep: 1,
  },
};

export const AllApproved: Story = {
  args: {
    steps: steps.map((s) => ({
      ...s,
      status: "approved" as const,
      timestamp: Date.now(),
    })),
  },
};

export const Dark: Story = {
  args: {
    steps,
    currentStep: 2,
  },
  parameters: { backgrounds: { default: "dark" } },
};
