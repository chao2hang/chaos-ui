import type { Meta, StoryObj } from "@storybook/react"
import { ChatStreamingText } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof ChatStreamingText> = {
  title: "Business/ChatStreamingText",
  component: ChatStreamingText,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
