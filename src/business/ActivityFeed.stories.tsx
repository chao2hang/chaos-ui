import type { Meta, StoryObj } from "@storybook/react"
import { ActivityFeed } from "@/components/business/activity-feed"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const meta = {
  title: "Business/ActivityFeed",
  component: ActivityFeed,
  tags: ["autodocs"],
} satisfies Meta<typeof ActivityFeed>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    activities: [
      { id: "1", user: { name: "John Doe" }, action: "created a new project", target: "Website Redesign", time: "2 hours ago", icon: <Avatar className="size-6"><AvatarFallback>JD</AvatarFallback></Avatar> },
      { id: "2", user: { name: "Jane Smith" }, action: "commented on", target: "Bug #123", time: "3 hours ago", icon: <Avatar className="size-6"><AvatarFallback>JS</AvatarFallback></Avatar> },
      { id: "3", user: { name: "Bob Wilson" }, action: "completed task", target: "Update docs", time: "5 hours ago", icon: <Avatar className="size-6"><AvatarFallback>BW</AvatarFallback></Avatar> },
    ],
  },
}
