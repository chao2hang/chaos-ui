import type { Meta, StoryObj } from "@storybook/react"
import { CurrencyInput } from "@/components/business/currency-input"

const meta = {
  title: "Business/CurrencyInput",
  component: CurrencyInput,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    value: undefined,
    onChange: () => {},
  },
} satisfies Meta<typeof CurrencyInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 1234.56,
  },
}

export const Euro: Story = {
  args: {
    value: 9876.54,
    currency: "EUR",
    locale: "de-DE",
  },
}

export const Disabled: Story = {
  args: {
    value: 500,
    disabled: true,
  },
}

export const Dark: Story = {
  args: {
    value: 1234.56,
  },
  parameters: { backgrounds: { default: "dark" } },
}
