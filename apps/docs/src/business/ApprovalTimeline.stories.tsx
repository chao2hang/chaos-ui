import type { Meta, StoryObj } from "@storybook/react";
import { ApprovalTimeline } from "@/components/business/approval-timeline";

const meta: Meta<typeof ApprovalTimeline> = {
  title: "Business/ApprovalTimeline",
  component: ApprovalTimeline,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
