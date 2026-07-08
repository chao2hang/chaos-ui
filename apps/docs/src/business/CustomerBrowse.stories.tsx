import type { Meta, StoryObj } from "@storybook/react"
import { CustomerBrowse } from "@/components/business/customer-browse"

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
