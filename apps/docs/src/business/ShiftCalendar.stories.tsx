import type { Meta, StoryObj } from "@storybook/react";
import { ShiftCalendar } from "@/components/business/shift-calendar";

const meta = {
  title: "Business/ShiftCalendar",
  component: ShiftCalendar,
  tags: ["autodocs"],
} satisfies Meta<typeof ShiftCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
