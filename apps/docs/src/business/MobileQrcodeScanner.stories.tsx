import type { Meta, StoryObj } from "@storybook/react"
import { MobileQrcodeScanner } from "@/components/business/mobile-qrcode-scanner"

const meta: Meta<typeof MobileQrcodeScanner> = {
  title: "Business/MobileQrcodeScanner",
  component: MobileQrcodeScanner,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
