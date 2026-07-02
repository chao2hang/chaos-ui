import type { Meta, StoryObj } from "@storybook/react"
import { ColorBoard } from "@/components/business/color-board"

const meta = {
  title: "Business/ColorBoard",
  component: ColorBoard,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof ColorBoard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: "#3b82f6",
    showSwatches: true,
  },
}

export const WithPresets: Story = {
  args: {
    value: "#22c55e",
    presets: ["#ef4444", "#f97316", "#eab308", "#22c55e", "#14b8a6", "#3b82f6", "#6366f1", "#a855f7"],
    showSwatches: true,
  },
}

export const WithHistory: Story = {
  args: {
    value: "#ec4899",
    history: true,
    showSwatches: true,
  },
}

export const WithAlpha: Story = {
  args: {
    value: "#6366f1",
    enableAlpha: true,
    showSwatches: true,
  },
}

export const FullFeatured: Story = {
  args: {
    value: "#f97316",
    format: "hex",
    history: true,
    enableEyeDropper: true,
    enableAlpha: true,
    showSwatches: true,
    presets: ["#ef4444", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"],
  },
}
