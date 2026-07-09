import type { Meta, StoryObj } from "@storybook/react"
import { ActivityFeed } from "@/components/business/activity-feed"

const meta: Meta<typeof ActivityFeed> = {
  title: "Business/ActivityFeed",
  component: ActivityFeed,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { user: "John Doe", action: "created a new project: Website Redesign", time: new Date().toISOString(), avatarFallback: "JD" },
      { user: "Jane Smith", action: "commented on Bug #123", time: new Date().toISOString(), avatarFallback: "JS" },
      { user: "Bob Wilson", action: "completed task: Update docs", time: new Date().toISOString(), avatarFallback: "BW" },
    ],
  },
}
