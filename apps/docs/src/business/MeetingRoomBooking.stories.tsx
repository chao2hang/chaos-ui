import type { Meta, StoryObj } from "@storybook/react";
import { MeetingRoomBooking } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof MeetingRoomBooking> = {
  title: "Business/MeetingRoomBooking",
  component: MeetingRoomBooking,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
