import type { Meta, StoryObj } from "@storybook/react"
import { ImMessage } from "@/components/business/im-message"

const meta: Meta<typeof ImMessage> = {
  title: "Business/ImMessage",
  component: ImMessage,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
