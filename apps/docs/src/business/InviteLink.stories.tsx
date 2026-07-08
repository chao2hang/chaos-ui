import type { Meta, StoryObj } from "@storybook/react"
import { InviteLink } from "@/components/business/invite-link"

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
