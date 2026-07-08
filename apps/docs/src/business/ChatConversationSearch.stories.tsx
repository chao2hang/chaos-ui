import type { Meta, StoryObj } from "@storybook/react"
import { ChatConversationSearch } from "@/components/business/chat-conversation-search"

const meta: Meta<typeof ChatConversationSearch> = {
  title: "Business/ChatConversationSearch",
  component: ChatConversationSearch,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
