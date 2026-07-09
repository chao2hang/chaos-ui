import type { Meta, StoryObj } from "@storybook/react";
import { ApprovalFlow } from "@chaos_team/chaos-ui/business";

const nodes = [
  { id: "1", name: "提交申请", type: "start", status: "approved" },
  { id: "2", name: "直属经理审批", type: "approval", status: "approved" },
  { id: "3", name: "部门总监审批", type: "approval", status: "processing" },
  { id: "4", name: "财务复核", type: "approval", status: "pending" },
  { id: "5", name: "CEO 终批", type: "approval", status: "pending" },
];

const edges = [
  { from: "1", to: "2" },
  { from: "2", to: "3" },
  { from: "3", to: "4" },
  { from: "4", to: "5" },
];

const rejectedNodes = [
  { id: "1", name: "提交申请", type: "start", status: "approved" },
  { id: "2", name: "直属经理审批", type: "approval", status: "approved" },
  { id: "3", name: "部门总监审批", type: "approval", status: "rejected" },
  { id: "4", name: "财务复核", type: "approval", status: "skipped" },
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
  args: { nodes, edges },
};

export const Rejected: Story = {
  args: {
    nodes: rejectedNodes,
    edges: edges.slice(0, 3),
  },
};

export const SingleStep: Story = {
  args: {
    nodes: [{ id: "1", name: "提交申请", type: "start", status: "approved" }],
    edges: [],
  },
};
