import type { Meta, StoryObj } from "@storybook/react";
import { CampaignCalendar } from "@/components/business/campaign-calendar";

const meta = {
  title: "Business/CampaignCalendar",
  component: CampaignCalendar,
  tags: ["autodocs"],
} satisfies Meta<typeof CampaignCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
