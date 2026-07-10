import type { Meta, StoryObj } from "@storybook/react";
import { CampaignCalendar } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof CampaignCalendar> = {
  title: "Business/CampaignCalendar",
  component: CampaignCalendar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CampaignCalendar events={[]} />,
};
