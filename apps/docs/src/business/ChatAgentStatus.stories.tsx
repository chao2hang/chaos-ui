import type { Meta, StoryObj } from "@storybook/react"
import { ChatAgentStatus } from "@/components/business/chat-agent-status"

const meta: Meta<typeof ChatAgentStatus> = {
  title: "Business/ChatAgentStatus",
  component: ChatAgentStatus,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
