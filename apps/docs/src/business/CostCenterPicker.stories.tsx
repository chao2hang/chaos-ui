import type { Meta, StoryObj } from "@storybook/react"
import { CostCenterPicker } from "@/components/business/cost-center-picker"

const meta: Meta<typeof CostCenterPicker> = {
  title: "Business/CostCenterPicker",
  component: CostCenterPicker,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
