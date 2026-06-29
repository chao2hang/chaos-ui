import type { Meta, StoryObj } from "@storybook/react"
import { Calendar } from "@/components/ui/calendar"

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof Calendar>

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

