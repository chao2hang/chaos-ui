import type { Meta, StoryObj } from "@storybook/react";
import { CampaignCalendar } from "@/components/business/campaign-calendar";

const meta: Meta<typeof CampaignCalendar> = {
  title: "Business/CampaignCalendar",
  component: CampaignCalendar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
