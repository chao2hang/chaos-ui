import type { Meta, StoryObj } from "@storybook/react"
import { ChatContextPanel } from "@/components/business/chat-context-panel"

const meta: Meta<typeof ChatContextPanel> = {
  title: "Business/ChatContextPanel",
  component: ChatContextPanel,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
