import type { Meta, StoryObj } from "@storybook/react"
import { ActivityFeed } from "@/components/business/activity-feed"

const meta = {
  title: "Business/ActivityFeed",
  component: ActivityFeed,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof ActivityFeed>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { user: "John Doe", action: "created Website Redesign", time: new Date().toISOString(), avatarFallback: "JD", variant: "success" },
      { user: "Jane Smith", action: "commented on Bug #123", time: new Date().toISOString(), avatarFallback: "JS", variant: "info" },
      { user: "Bob Wilson", action: "completed Update docs", time: new Date(Date.now() - 86400000).toISOString(), avatarFallback: "BW", variant: "default" },
    ],
  },
}

