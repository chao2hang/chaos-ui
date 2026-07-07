import type { Meta, StoryObj } from "@storybook/react";
import { TimeSlotPicker } from "@/components/business/calendar/time-slot-picker";

const meta = {
  title: "Business/TimeSlotPicker",
  component: TimeSlotPicker,
  tags: ["autodocs"],
} satisfies Meta<typeof TimeSlotPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
