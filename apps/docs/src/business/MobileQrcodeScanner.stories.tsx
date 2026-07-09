import type { Meta, StoryObj } from "@storybook/react"
import { MobileQrCodeScanner } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof MobileQrCodeScanner> = {
  title: "Business/MobileQrCodeScanner",
  component: MobileQrCodeScanner,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
