import type { Meta, StoryObj } from "@storybook/react";
import { ApprovalTimeline } from "@/components/business/approval-timeline";
import type { ApprovalStep } from "@/components/business/approval-timeline";

const approvedSteps: ApprovalStep[] = [
  {
    id: "legal",
    title: "Legal review",
    approver: "Maya Chen",
    status: "approved",
    time: "Jun 3, 2026 10:15",
    note: "Claims approved",
  },
  {
    id: "brand",
    title: "Brand review",
    approver: "Owen Patel",
    status: "approved",
    time: "Jun 3, 2026 14:40",
    note: "Ready for final QA",
  },
  {
    id: "growth",
    title: "Growth lead",
    approver: "Iris Wong",
    status: "pending",
    time: "Due Jun 4, 2026",
  },
];

const meta = {
  title: "Business/ApprovalTimeline",
  component: ApprovalTimeline,
  tags: ["autodocs", "a11y"],
  args: {
    steps: approvedSteps,
  },
} satisfies Meta<typeof ApprovalTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  args: {
    steps: [
      approvedSteps[0]!,
      {
        id: "brand",
        title: "Brand review",
        approver: "Owen Patel",
        status: "rejected",
        time: "Jun 3, 2026 14:40",
        note: "CTA needs revised compliance language",
      },
      {
        id: "finance",
        title: "Finance approval",
        approver: "Nora Kim",
        status: "skipped",
        time: "Not required",
      },
    ],
  },
};
