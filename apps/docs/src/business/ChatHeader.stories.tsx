import type { Meta, StoryObj } from "@storybook/react"
import { ChatHeader } from "@/components/business/chat-header"

const meta: Meta<typeof ChatHeader> = {
  title: "Business/ChatHeader",
  component: ChatHeader,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
