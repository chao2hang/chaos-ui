import type { Meta, StoryObj } from "@storybook/react"
import { ChatModelSwitcher } from "@/components/business/chat-model-switcher"

const meta: Meta<typeof ChatModelSwitcher> = {
  title: "Business/ChatModelSwitcher",
  component: ChatModelSwitcher,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
