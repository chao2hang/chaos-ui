import type { Meta, StoryObj } from "@storybook/react"
import { ChatMentionPicker } from "@/components/business/chat-mention-picker"

const meta: Meta<typeof ChatMentionPicker> = {
  title: "Business/ChatMentionPicker",
  component: ChatMentionPicker,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
