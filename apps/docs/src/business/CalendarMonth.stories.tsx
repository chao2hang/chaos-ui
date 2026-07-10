import type { Meta, StoryObj } from "@storybook/react";
import { CalendarMonth } from "@/components/business/calendar/calendar-month";

const meta: Meta<typeof CalendarMonth> = {
  title: "Business/CalendarMonth",
  component: CalendarMonth,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CalendarMonth
      onDateChange={() => {}}
      onEventClick={() => {}}
      onDayClick={() => {}}
    />
  ),
};
