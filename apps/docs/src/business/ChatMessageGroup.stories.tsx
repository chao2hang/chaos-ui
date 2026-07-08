import type { Meta, StoryObj } from "@storybook/react"
import { ChatMessageGroup } from "@/components/business/chat-message-group"

const meta: Meta<typeof ChatMessageGroup> = {
  title: "Business/ChatMessageGroup",
  component: ChatMessageGroup,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
