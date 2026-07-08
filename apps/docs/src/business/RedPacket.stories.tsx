import type { Meta, StoryObj } from "@storybook/react"
import { RedPacket } from "@/components/business/red-packet"

const meta: Meta<typeof RedPacket> = {
  title: "Business/RedPacket",
  component: RedPacket,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
