import type { Meta, StoryObj } from "@storybook/react"
import { Customer360Card } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof Customer360Card> = {
  title: "Business/Customer360Card",
  component: Customer360Card,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
