import type { Meta, StoryObj } from "@storybook/react"
import { ChatCodeBlock } from "@/components/business/chat-code-block"

const meta: Meta<typeof ChatCodeBlock> = {
  title: "Business/ChatCodeBlock",
  component: ChatCodeBlock,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
