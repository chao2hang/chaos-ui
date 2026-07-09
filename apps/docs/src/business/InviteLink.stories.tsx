import type { Meta, StoryObj } from "@storybook/react"
import { InviteLink } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof InviteLink> = {
  title: "Business/InviteLink",
  component: InviteLink,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
