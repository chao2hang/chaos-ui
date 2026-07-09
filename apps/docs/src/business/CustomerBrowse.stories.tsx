import type { Meta, StoryObj } from "@storybook/react"
import { CustomerBrowse } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof CustomerBrowse> = {
  title: "Business/CustomerBrowse",
  component: CustomerBrowse,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
