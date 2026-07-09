import type { Meta, StoryObj } from "@storybook/react"
import { ChatSharedLink } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof ChatSharedLink> = {
  title: "Business/ChatSharedLink",
  component: ChatSharedLink,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
