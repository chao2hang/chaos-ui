import type { Meta, StoryObj } from "@storybook/react"
import { SignActionButton } from "@/components/business/sign-action-button"

const meta: Meta<typeof SignActionButton> = {
  title: "Business/SignActionButton",
  component: SignActionButton,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
