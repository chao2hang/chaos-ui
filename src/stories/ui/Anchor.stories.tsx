import type { Meta, StoryObj } from "@storybook/react"
import { Anchor } from "@/components/ui/anchor"

const meta = {
  title: "Components/Anchor",
  component: Anchor,
  tags: ["autodocs"],
} satisfies Meta<typeof Anchor>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { key: "basic", href: "#basic", label: "Basic Info" },
  { key: "details", href: "#details", label: "Details", level: 2 },
  { key: "advanced", href: "#advanced", label: "Advanced", level: 2 },
  { key: "settings", href: "#settings", label: "Settings" },
]

export const Default: Story = {
  args: { items },
}

export const WithActiveKey: Story = {
  args: { items, activeKey: "details" },
}
