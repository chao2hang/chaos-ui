import type { Meta, StoryObj } from "@storybook/react"
import { MultiCurrencyInput } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof MultiCurrencyInput> = {
  title: "Business/MultiCurrencyInput",
  component: MultiCurrencyInput,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
