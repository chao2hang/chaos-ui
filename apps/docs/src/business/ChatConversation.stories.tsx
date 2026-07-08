import type { Meta, StoryObj } from "@storybook/react"
import { ChatConversation } from "@/components/business/chat-conversation"

const meta: Meta<typeof ChatConversation> = {
  title: "Business/ChatConversation",
  component: ChatConversation,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
