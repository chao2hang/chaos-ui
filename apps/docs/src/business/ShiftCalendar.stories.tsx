import type { Meta, StoryObj } from "@storybook/react";
import { ShiftCalendar } from "@/components/business/shift-calendar";

const meta: Meta<typeof ShiftCalendar> = {
  title: "Business/ShiftCalendar",
  component: ShiftCalendar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
