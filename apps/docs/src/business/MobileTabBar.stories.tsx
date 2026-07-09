import type { Meta, StoryObj } from "@storybook/react"
import { MobileTabBar } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof MobileTabBar> = {
  title: "Business/MobileTabBar",
  component: MobileTabBar,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
