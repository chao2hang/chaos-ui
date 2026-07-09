import type { Meta, StoryObj } from "@storybook/react"
import { ChatToolCallBlock } from "@chaos_team/chaos-ui/business"

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
