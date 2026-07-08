import type { Meta, StoryObj } from "@storybook/react"
import { CompanyPicker } from "@/components/business/company-picker"

const meta: Meta<typeof CompanyPicker> = {
  title: "Business/CompanyPicker",
  component: CompanyPicker,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
