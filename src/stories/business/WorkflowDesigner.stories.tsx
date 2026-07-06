import type { Meta, StoryObj } from "@storybook/react";
import { WorkflowDesigner, type WorkflowNode, type WorkflowEdge } from "@/components/business/workflow-designer";

const nodes: WorkflowNode[] = [
  { id: "1", name: "Start", type: "start" },
  { id: "2", name: "Review", type: "task" },
  { id: "3", name: "Approve", type: "gateway" },
  { id: "4", name: "End", type: "end" },
];

const edges: WorkflowEdge[] = [
  { from: "1", to: "2" },
  { from: "2", to: "3" },
  { from: "3", to: "4" },
];

const meta = {
  title: "Business/Approval/WorkflowDesigner",
  component: WorkflowDesigner,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { nodes: [], edges: [] },
} satisfies Meta<typeof WorkflowDesigner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { nodes, edges },
};

export const WithChangeCallback: Story = {
  args: {
    nodes,
    edges,
    onChange: (config) => { void config; },
  },
};

export const Complex: Story = {
  args: {
    nodes: [
      { id: "1", name: "Start", type: "start" },
      { id: "2", name: "Review", type: "task" },
      { id: "3", name: "Gate", type: "gateway" },
      { id: "4", name: "Approve", type: "task" },
      { id: "5", name: "Reject", type: "task" },
      { id: "6", name: "End", type: "end" },
    ],
    edges: [
      { from: "1", to: "2" },
      { from: "2", to: "3" },
      { from: "3", to: "4" },
      { from: "3", to: "5" },
      { from: "4", to: "6" },
      { from: "5", to: "6" },
    ],
  },
};
