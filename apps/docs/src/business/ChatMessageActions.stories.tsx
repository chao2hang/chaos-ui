import type { Meta, StoryObj } from "@storybook/react"
import { ChatMessageActions } from "@/components/business/chat-message-actions"

const meta: Meta<typeof ChatMessageActions> = {
  title: "Business/ChatMessageActions",
  component: ChatMessageActions,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
