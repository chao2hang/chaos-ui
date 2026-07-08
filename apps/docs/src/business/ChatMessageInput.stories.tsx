import type { Meta, StoryObj } from "@storybook/react"
import { ChatMessageInput } from "@/components/business/chat-message-input"

const meta: Meta<typeof ChatMessageInput> = {
  title: "Business/ChatMessageInput",
  component: ChatMessageInput,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
