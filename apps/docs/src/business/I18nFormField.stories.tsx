import type { Meta, StoryObj } from "@storybook/react"
import { I18nFormField } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof I18nFormField> = {
  title: "Business/I18nFormField",
  component: I18nFormField,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
