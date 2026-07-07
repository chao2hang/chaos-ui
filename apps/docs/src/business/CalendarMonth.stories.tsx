import type { Meta, StoryObj } from "@storybook/react";
import { CalendarMonth } from "@/components/business/calendar/calendar-month";

const meta = {
  title: "Business/CalendarMonth",
  component: CalendarMonth,
  tags: ["autodocs"],
} satisfies Meta<typeof CalendarMonth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
