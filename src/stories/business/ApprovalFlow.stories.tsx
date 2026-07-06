import type { Meta, StoryObj } from "@storybook/react";
import { ApprovalFlow } from "@/components/business/approval-flow";

const nodes = [
  { id: "1", name: "Submitter", type: "start", status: "done" },
  { id: "2", name: "Manager", type: "approval", status: "done" },
  { id: "3", name: "Director", type: "approval", status: "active" },
  { id: "4", name: "Finance", type: "approval", status: "pending" },
];

const edges = [
  { from: "1", to: "2" },
  { from: "2", to: "3" },
  { from: "3", to: "4" },
];

const meta = {
  title: "Business/Approval/ApprovalFlow",
  component: ApprovalFlow,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { nodes: [], edges: [] },
} satisfies Meta<typeof ApprovalFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { nodes, edges },
};

export const AllDone: Story = {
  args: {
    nodes: nodes.map((n) => ({ ...n, status: "done" as const })),
    edges,
  },
};

export const AllPending: Story = {
  args: {
    nodes: nodes.map((n) => ({ ...n, status: "pending" as const })),
    edges,
  },
};
