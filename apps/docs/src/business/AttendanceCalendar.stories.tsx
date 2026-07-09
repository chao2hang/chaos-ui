import type { Meta, StoryObj } from "@storybook/react";
import { AttendanceCalendar } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof AttendanceCalendar> = {
  title: "Business/AttendanceCalendar",
  component: AttendanceCalendar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
