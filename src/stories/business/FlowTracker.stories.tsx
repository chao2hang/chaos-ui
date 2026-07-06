import type { Meta, StoryObj } from "@storybook/react";
import { FlowTracker } from "@/components/business/flow-tracker";

const steps = [
  { id: "1", name: "Submitted", status: "done" as const, operator: "Alice", time: "09:30" },
  { id: "2", name: "Reviewed", status: "done" as const, operator: "Bob", time: "10:15" },
  { id: "3", name: "Approved", status: "active" as const, operator: "Carol" },
  { id: "4", name: "Archived", status: "pending" as const },
];

const meta = {
  title: "Business/Approval/FlowTracker",
  component: FlowTracker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { steps: [] },
} satisfies Meta<typeof FlowTracker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { steps },
};

export const AllDone: Story = {
  args: {
    steps: steps.map((s) => ({ ...s, status: "done" as const })),
  },
};

export const WithRejection: Story = {
  args: {
    steps: [
      { id: "1", name: "Submitted", status: "done" as const, operator: "Alice", time: "09:30" },
      { id: "2", name: "Reviewed", status: "rejected" as const, operator: "Bob", time: "10:15" },
    ],
  },
};
