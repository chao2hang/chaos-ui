import type { Meta, StoryObj } from "@storybook/react"
import { LeaveRequestForm } from "@/components/business/leave-request-form"

const meta: Meta<typeof LeaveRequestForm> = {
  title: "Business/LeaveRequestForm",
  component: LeaveRequestForm,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
