import type { Meta, StoryObj } from "@storybook/react"
import { ChatCardMessage } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof ChatCardMessage> = {
  title: "Business/ChatCardMessage",
  component: ChatCardMessage,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
