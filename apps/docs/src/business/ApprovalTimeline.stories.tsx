import type { Meta, StoryObj } from "@storybook/react";
import { ApprovalTimeline } from "@/components/business/approval-timeline";

const meta = {
  title: "Business/ApprovalTimeline",
  component: ApprovalTimeline,
  tags: ["autodocs"],
} satisfies Meta<typeof ApprovalTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
