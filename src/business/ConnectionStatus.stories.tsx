import type { Meta, StoryObj } from "@storybook/react"
import { ConnectionStatus } from "@/components/business/connection-status"

const meta = {
  title: "Business/ConnectionStatus",
  component: ConnectionStatus,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ConnectionStatus>

export default meta
type Story = StoryObj<typeof meta>

export const Banner: Story = {
  args: {
    variant: "banner",
    showWhenOnline: true,
  },
}

export const Offline: Story = {
  args: {
    variant: "banner",
  },
  decorators: [
    (Story) => {
      Object.defineProperty(navigator, "onLine", { value: false, configurable: true })
      return <Story />
    },
  ],
}

export const Inline: Story = {
  args: { variant: "inline", showWhenOnline: true },
}

export const Toast: Story = {
  args: { variant: "toast" },
}
