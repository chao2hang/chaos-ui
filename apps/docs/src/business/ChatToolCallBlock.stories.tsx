import type { Meta, StoryObj } from "@storybook/react"
import { ChatToolCallBlock } from "@/components/business/chat-tool-call-block"

const meta: Meta<typeof ChatToolCallBlock> = {
  title: "Business/ChatToolCallBlock",
  component: ChatToolCallBlock,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
