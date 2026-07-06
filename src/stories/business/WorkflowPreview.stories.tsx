import type { Meta, StoryObj } from "@storybook/react";
import { WorkflowPreview } from "@/components/business/workflow-preview";

const nodes = [
  { id: "1", name: "Submission", status: "done" as const },
  { id: "2", name: "Initial Review", status: "done" as const },
  { id: "3", name: "Manager Approval", status: "active" as const },
  { id: "4", name: "Finance Check", status: "pending" as const },
];

const edges = [
  { from: "1", to: "2" },
  { from: "2", to: "3" },
  { from: "3", to: "4" },
];

const meta = {
  title: "Business/Approval/WorkflowPreview",
  component: WorkflowPreview,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { nodes: [], edges: [] },
} satisfies Meta<typeof WorkflowPreview>;

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

export const Linear: Story = {
  args: {
    nodes: [
      { id: "1", name: "Start", status: "done" as const },
      { id: "2", name: "Process", status: "done" as const },
      { id: "3", name: "End", status: "done" as const },
    ],
    edges: [
      { from: "1", to: "2" },
      { from: "2", to: "3" },
    ],
  },
};
