import type { Meta, StoryObj } from "@storybook/react"
import { CalendarView } from "@/components/business/calendar-view"

const meta: Meta<typeof CalendarView> = {
  title: "Business/CalendarView",
  component: CalendarView,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

const today = new Date()
const y = today.getFullYear()
const m = String(today.getMonth() + 1).padStart(2, "0")
const d = String(today.getDate()).padStart(2, "0")
const todayIso = `${y}-${m}-${d}`

export const Default: Story = {
  args: {
    events: [
      { id: "1", date: todayIso, title: "团队站会", color: "#3b82f6" },
      { id: "2", date: todayIso, title: "需求评审", color: "#f59e0b" },
      { id: "3", date: "2026-07-15", title: "版本发布", color: "#10b981" },
    ],
  },
}
