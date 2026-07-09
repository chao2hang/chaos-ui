import type { Meta, StoryObj } from "@storybook/react";
import { CampaignCard } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof CampaignCard> = {
  title: "Business/CampaignCard",
  component: CampaignCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
