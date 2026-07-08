import type { Meta, StoryObj } from "@storybook/react"
import { TabPin } from "@/components/business/tab-pin"

const meta: Meta<typeof TabPin> = {
  title: "Business/TabPin",
  component: TabPin,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
