import type { Meta, StoryObj } from "@storybook/react"
import { MobileListItem } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof MobileListItem> = {
  title: "Business/MobileListItem",
  component: MobileListItem,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
