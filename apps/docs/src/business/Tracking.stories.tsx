import type { Meta, StoryObj } from "@storybook/react"
import { Tracking } from "@/components/business/tracking"

const meta: Meta<typeof Tracking> = {
  title: "Business/Tracking",
  component: Tracking,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
