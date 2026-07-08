import type { Meta, StoryObj } from "@storybook/react"
import { ChatThinkingBlock } from "@/components/business/chat-thinking-block"

const meta: Meta<typeof ChatThinkingBlock> = {
  title: "Business/ChatThinkingBlock",
  component: ChatThinkingBlock,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
