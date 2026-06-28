import type { Meta, StoryObj } from "@storybook/react"
import { QRCode } from "@/components/ui/qrcode"

const meta = {
  title: "Components/QRCode",
  component: QRCode,
  tags: ["autodocs"],
} satisfies Meta<typeof QRCode>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: "https://example.com" },
}

export const Large: Story = {
  args: { value: "https://example.com", size: 256 },
}

export const CustomColors: Story = {
  args: { value: "https://example.com", fgColor: "#1a73e8", bgColor: "#f0f4ff" },
}

export const HighCorrection: Story = {
  args: { value: "https://example.com", level: "H" },
}

export const CanvasMode: Story = {
  args: { value: "https://example.com", renderAs: "canvas" },
}
