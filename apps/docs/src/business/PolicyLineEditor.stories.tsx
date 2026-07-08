import type { Meta, StoryObj } from "@storybook/react"
import { PolicyLineEditor } from "@/components/business/policy-line-editor"

const meta: Meta<typeof PolicyLineEditor> = {
  title: "Business/PolicyLineEditor",
  component: PolicyLineEditor,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
