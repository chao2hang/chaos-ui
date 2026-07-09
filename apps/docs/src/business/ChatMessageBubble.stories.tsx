import type { Meta, StoryObj } from "@storybook/react"
import { ChatMessageBubble } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof ChatMessageBubble> = {
  title: "Business/ChatMessageBubble",
  component: ChatMessageBubble,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
