import type { Meta, StoryObj } from "@storybook/react"
import { CopyButton } from "@/components/business/copy-button"

const meta: Meta<typeof CopyButton> = {
  title: "Business/CopyButton",
  component: CopyButton,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    text: "Hello, World!",
  };

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Outline: Story = {
  args: {
    variant: "outline",
    label: "Copy text",
    copiedLabel: "Copied!",
  },
}

export const DefaultVariant: Story = {
  args: {
    variant: "default",
    label: "Copy URL",
  },
}

export const Dark: Story = {
  args: {
    text: "Secret value",
    variant: "outline",
  },
  parameters: { backgrounds: { default: "dark" } },
}
