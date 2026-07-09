import type { Meta, StoryObj } from "@storybook/react"
import { AnnouncementCard } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof AnnouncementCard> = {
  title: "Business/AnnouncementCard",
  component: AnnouncementCard,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
