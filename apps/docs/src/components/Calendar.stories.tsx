import type { Meta, StoryObj } from "@storybook/react"
import { Calendar } from "@/components/ui/calendar"

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Calendar mode="single" className="rounded-md border" />,
}

export const WithSelectedDate: Story = {
  render: () => {
    const today = new Date()
    return <Calendar mode="single" selected={today} className="rounded-md border" />
  },
}

export const Multiple: Story = {
  render: () => <Calendar mode="multiple" className="rounded-md border" />,
}

export const Range: Story = {
  render: () => <Calendar mode="range" className="rounded-md border" />,
}
