import type { Meta, StoryObj } from "@storybook/react"
import { ChatInputToolbar } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof ChatInputToolbar> = {
  title: "Business/ChatInputToolbar",
  component: ChatInputToolbar,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
