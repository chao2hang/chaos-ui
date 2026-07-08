import type { Meta, StoryObj } from "@storybook/react"
import { MobileTabBar } from "@/components/business/mobile-tab-bar"

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
