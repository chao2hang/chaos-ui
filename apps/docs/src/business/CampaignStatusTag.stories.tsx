import type { Meta, StoryObj } from "@storybook/react";
import { CampaignStatusTag } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof CampaignStatusTag> = {
  title: "Business/CampaignStatusTag",
  component: CampaignStatusTag,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
