import type { Meta, StoryObj } from "@storybook/react"
import { AttendanceCalendar } from "@/components/business/attendance-calendar"

const meta: Meta<typeof AttendanceCalendar> = {
  title: "Business/AttendanceCalendar",
  component: AttendanceCalendar,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
