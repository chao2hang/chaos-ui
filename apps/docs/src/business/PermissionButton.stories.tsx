import type { Meta, StoryObj } from "@storybook/react"
import { PermissionButton } from "@/components/business/permission-button"

const meta: Meta<typeof PermissionButton> = {
  title: "Business/PermissionButton",
  component: PermissionButton,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
