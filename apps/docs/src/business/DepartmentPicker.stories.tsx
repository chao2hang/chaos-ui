import type { Meta, StoryObj } from "@storybook/react"
import { DepartmentPicker } from "@/components/business/department-picker"

const meta: Meta<typeof DepartmentPicker> = {
  title: "Business/DepartmentPicker",
  component: DepartmentPicker,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
