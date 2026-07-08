import type { Meta, StoryObj } from "@storybook/react"
import { RuleEditor } from "@/components/business/rule-editor"

const meta: Meta<typeof RuleEditor> = {
  title: "Business/RuleEditor",
  component: RuleEditor,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
