import type { Meta, StoryObj } from "@storybook/react"
import { MessageList } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof MessageList> = {
  title: "Business/MessageList",
  component: MessageList,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
