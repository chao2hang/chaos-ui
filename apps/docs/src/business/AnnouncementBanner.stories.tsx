import type { Meta, StoryObj } from "@storybook/react"
import { AnnouncementBanner } from "@/components/business/announcement-banner"

const meta: Meta<typeof AnnouncementBanner> = {
  title: "Business/AnnouncementBanner",
  component: AnnouncementBanner,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
