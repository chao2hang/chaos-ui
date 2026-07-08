import type { Meta, StoryObj } from "@storybook/react"
import { CreditCardInput } from "@/components/business/credit-card-input"

const meta: Meta<typeof CreditCardInput> = {
  title: "Business/CreditCardInput",
  component: CreditCardInput,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    value: "",
    onChange: () => {},
  };

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
  args: {
    value: "4242424242424242",
  },
}

export const Disabled: Story = {
  args: {
    value: "4242424242424242",
    disabled: true,
  },
}

export const Dark: Story = {
  args: {
    value: "4242424242424242",
  },
  parameters: { backgrounds: { default: "dark" } },
}
