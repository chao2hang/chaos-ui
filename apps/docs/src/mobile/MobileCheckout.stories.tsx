import type { Meta, StoryObj } from "@storybook/react"
import { MobileCheckout } from "@/components/mobile/mobile-checkout"

const meta: Meta<typeof MobileCheckout> = {
  title: "Mobile/MobileCheckout",
  component: MobileCheckout,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
