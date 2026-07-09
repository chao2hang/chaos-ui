import type { Meta, StoryObj } from "@storybook/react";
import { OrgChart } from "@chaos_team/chaos-ui/business";
import type { OrgNode, OrgEdge } from "@chaos_team/chaos-ui/business";

const sampleNodes: OrgNode[] = [
  { id: "1", name: "Alice Chen", title: "CEO", department: "Executive" },
  { id: "2", name: "Bob Smith", title: "CTO", department: "Engineering" },
  { id: "3", name: "Carol Lee", title: "CFO", department: "Finance" },
  {
    id: "4",
    name: "Dave Wilson",
    title: "VP Engineering",
    department: "Engineering",
  },
  { id: "5", name: "Eve Brown", title: "VP Design", department: "Design" },
];

const sampleEdges: OrgEdge[] = [
  { source: "1", target: "2" },
  { source: "1", target: "3" },
  { source: "2", target: "4" },
  { source: "2", target: "5" },
];

const meta: Meta<typeof OrgChart> = {
  title: "Business/OrgChart",
  component: OrgChart,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    nodes: sampleNodes,
    edges: sampleEdges,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAvatars: Story = {
  args: {
    nodes: [
      {
        id: "1",
        name: "Alice Chen",
        title: "CEO",
        avatarUrl: "https://i.pravatar.cc/40?u=1",
        department: "Executive",
      },
      {
        id: "2",
        name: "Bob Smith",
        title: "CTO",
        avatarUrl: "https://i.pravatar.cc/40?u=2",
        department: "Engineering",
      },
      {
        id: "3",
        name: "Carol Lee",
        title: "CFO",
        avatarUrl: "https://i.pravatar.cc/40?u=3",
        department: "Finance",
      },
    ],
    edges: [
      { source: "1", target: "2" },
      { source: "1", target: "3" },
    ],
  },
};

export const Dark: Story = {
  args: {
    nodes: sampleNodes,
    edges: sampleEdges,
  },
  parameters: { backgrounds: { default: "dark" } },
};
