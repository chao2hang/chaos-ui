import type { Meta, StoryObj } from "@storybook/react"
import { MobilePicker } from "@/components/business/mobile-picker"

const meta: Meta<typeof MobilePicker> = {
  title: "Business/MobilePicker",
  component: MobilePicker,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
