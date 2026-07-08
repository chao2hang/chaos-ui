import type { Meta, StoryObj } from "@storybook/react"
import { DistributorPicker } from "@/components/business/distributor-picker"

const meta: Meta<typeof DistributorPicker> = {
  title: "Business/DistributorPicker",
  component: DistributorPicker,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
