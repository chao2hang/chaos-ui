import type { Meta, StoryObj } from "@storybook/react"
import { MobileSignature } from "@/components/business/mobile-signature"

const meta: Meta<typeof MobileSignature> = {
  title: "Business/MobileSignature",
  component: MobileSignature,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
