import type { Meta, StoryObj } from "@storybook/react"
import { MobileSwipeAction } from "@/components/ui/mobile-swipe-action"

const meta: Meta<typeof MobileSwipeAction> = {
  title: "Components/MobileSwipeAction",
  component: MobileSwipeAction,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
