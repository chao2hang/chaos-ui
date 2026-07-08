import type { Meta, StoryObj } from "@storybook/react"
import { ChatMarkdownRenderer } from "@/components/business/chat-markdown-renderer"

const meta: Meta<typeof ChatMarkdownRenderer> = {
  title: "Business/ChatMarkdownRenderer",
  component: ChatMarkdownRenderer,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
