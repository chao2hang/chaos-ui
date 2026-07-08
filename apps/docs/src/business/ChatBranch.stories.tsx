import type { Meta, StoryObj } from "@storybook/react"
import { ChatBranch } from "@/components/business/chat-branch"

const meta: Meta<typeof ChatBranch> = {
  title: "Business/ChatBranch",
  component: ChatBranch,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
