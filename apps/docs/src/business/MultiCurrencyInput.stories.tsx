import type { Meta, StoryObj } from "@storybook/react"
import { MultiCurrencyInput } from "@/components/business/multi-currency-input"

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
