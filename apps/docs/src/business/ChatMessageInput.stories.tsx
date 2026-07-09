import type { Meta, StoryObj } from "@storybook/react"
import { ChatMessageInput } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof ChatMessageInput> = {
  title: "Business/ChatMessageInput",
  component: ChatMessageInput,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
