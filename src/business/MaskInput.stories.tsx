import type { Meta, StoryObj } from "@storybook/react"
import { MaskInput } from "@/components/business/mask-input"

const meta = {
  title: "Business/MaskInput",
  component: MaskInput,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    mask: "(999) 999-9999",
    value: "",
    onChange: () => {},
  },
} satisfies Meta<typeof MaskInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SSNMask: Story = {
  args: {
    mask: "999-99-9999",
    placeholder: "SSN",
  },
}

export const ZipCodeMask: Story = {
  args: {
    mask: "99999",
    placeholder: "ZIP Code",
  },
}

export const Disabled: Story = {
  args: {
    value: "(123) 456-7890",
    disabled: true,
  },
}

export const Dark: Story = {
  args: {
    mask: "(999) 999-9999",
    value: "(123) 456-7890",
  },
  parameters: { backgrounds: { default: "dark" } },
}
