import type { Meta, StoryObj } from "@storybook/react"
import { SerialNumberManager } from "@/components/business/serial-number-manager"

const meta: Meta<typeof SerialNumberManager> = {
  title: "Business/SerialNumberManager",
  component: SerialNumberManager,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
