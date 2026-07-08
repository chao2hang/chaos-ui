import type { Meta, StoryObj } from "@storybook/react"
import { AvatarGroup } from "@/components/business/avatar-group"

const meta: Meta<typeof AvatarGroup> = {
  title: "Business/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
