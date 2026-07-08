import type { Meta, StoryObj } from "@storybook/react"
import { BadgeDelta } from "@/components/business/badge-delta"

const meta: Meta<typeof BadgeDelta> = {
  title: "Business/BadgeDelta",
  component: BadgeDelta,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
