import type { Meta, StoryObj } from "@storybook/react";
import { TimeSlotPicker } from "@/components/business/calendar/time-slot-picker";

const meta: Meta<typeof TimeSlotPicker> = {
  title: "Business/TimeSlotPicker",
  component: TimeSlotPicker,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
