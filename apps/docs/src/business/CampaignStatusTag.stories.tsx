import type { Meta, StoryObj } from "@storybook/react";
import { CampaignStatusTag } from "@/components/business/campaign-status-tag";

const meta = {
  title: "Business/CampaignStatusTag",
  component: CampaignStatusTag,
  tags: ["autodocs"],
} satisfies Meta<typeof CampaignStatusTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
