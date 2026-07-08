import type { Meta, StoryObj } from "@storybook/react"
import { CalendarView } from "@/components/business/calendar-view"

const meta: Meta<typeof CalendarView> = {
  title: "Business/CalendarView",
  component: CalendarView,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
