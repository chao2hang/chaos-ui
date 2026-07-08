import type { Meta, StoryObj } from "@storybook/react"
import { TimelineView } from "@/components/business/timeline-view"

const meta: Meta<typeof TimelineView> = {
  title: "Business/TimelineView",
  component: TimelineView,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
