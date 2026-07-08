import type { Meta, StoryObj } from "@storybook/react"
import { BarcodeDisplay } from "@/components/business/barcode-display"

const meta: Meta<typeof BarcodeDisplay> = {
  title: "Business/BarcodeDisplay",
  component: BarcodeDisplay,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    value: "123456789012",
  };

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const EAN13: Story = {
  args: {
    value: "5901234123457",
    format: "EAN13",
  },
}

export const CustomSize: Story = {
  args: {
    value: "BARCODE-DEMO",
    format: "CODE128",
    width: 3,
    height: 120,
  },
}

export const Dark: Story = {
  args: {
    value: "123456789012",
  },
  parameters: { backgrounds: { default: "dark" } },
}
