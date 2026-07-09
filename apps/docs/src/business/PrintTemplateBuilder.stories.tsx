import type { Meta, StoryObj } from "@storybook/react"
import { PrintTemplateBuilder } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof PrintTemplateBuilder> = {
  title: "Business/PrintTemplateBuilder",
  component: PrintTemplateBuilder,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
