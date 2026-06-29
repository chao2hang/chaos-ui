import type { Meta, StoryObj } from "@storybook/react"
import { PhoneInput } from "@/components/business/phone-input"

const meta = {
  title: "Business/PhoneInput",
  component: PhoneInput,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    value: "",
    onChange: () => {},
    defaultCountry: "CN",
  },
} satisfies Meta<typeof PhoneInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithUSCountry: Story = {
  args: {
    defaultCountry: "US",
    placeholder: "Enter US number",
  },
}

export const Disabled: Story = {
  args: {
    value: "+8613800138000",
    disabled: true,
  },
}

export const Dark: Story = {
  args: {
    value: "+8613800138000",
  },
  parameters: { backgrounds: { default: "dark" } },
}
