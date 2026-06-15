import type { Meta, StoryObj } from "@storybook/react"
import { SignaturePad } from "@/components/business/signature-pad"

const meta = {
  title: "Business/SignaturePad",
  component: SignaturePad,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    width: 400,
    height: 200,
  },
} satisfies Meta<typeof SignaturePad>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = {
  args: {
    width: 250,
    height: 120,
  },
}

export const Large: Story = {
  args: {
    width: 600,
    height: 300,
  },
}

export const Dark: Story = {
  parameters: { backgrounds: { default: "dark" } },
}
