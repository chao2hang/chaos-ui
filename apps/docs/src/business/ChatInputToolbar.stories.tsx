import type { Meta, StoryObj } from "@storybook/react"
import { ChatInputToolbar } from "@/components/business/chat-input-toolbar"

const meta: Meta<typeof ChatInputToolbar> = {
  title: "Business/ChatInputToolbar",
  component: ChatInputToolbar,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
