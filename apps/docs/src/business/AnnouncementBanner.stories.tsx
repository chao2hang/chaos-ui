import type { Meta, StoryObj } from "@storybook/react";
import { AnnouncementBanner } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof AnnouncementBanner> = {
  title: "Business/AnnouncementBanner",
  component: AnnouncementBanner,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
