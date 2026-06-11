import type { Meta, StoryObj } from "@storybook/react"
import { Timeline, TimelineItem } from "@/components/ui/timeline"
import { CheckCircle2Icon, ClockIcon, XCircleIcon } from "lucide-react"

const meta = {
  title: "Components/Timeline",
  component: Timeline,
  tags: ["autodocs"],
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Timeline>
      <TimelineItem icon={CheckCircle2Icon} title="Order placed" description="Order #12345 placed successfully" time="2 hours ago" status="completed" />
      <TimelineItem icon={ClockIcon} title="Processing" description="Your order is being prepared" time="1 hour ago" status="current" />
      <TimelineItem icon={XCircleIcon} title="Cancelled" description="This step was cancelled" time="-" status="pending" />
    </Timeline>
  ),
}

export const Activity: Story = {
  render: () => (
    <Timeline>
      <TimelineItem title="User signed up" description="New user registered" time="10 minutes ago" />
      <TimelineItem title="Profile updated" description="User changed avatar" time="5 minutes ago" />
      <TimelineItem title="Logged in" description="User logged in from Chrome" time="2 minutes ago" />
    </Timeline>
  ),
}
