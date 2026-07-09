import type { Meta, StoryObj } from "@storybook/react"
import { Chip } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof Chip> = {
  title: "Business/Chip",
  component: Chip,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Chip>默认</Chip>,
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Chip variant="default">Default</Chip>
      <Chip variant="primary">Primary</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="destructive">Destructive</Chip>
      <Chip variant="info">Info</Chip>
      <Chip variant="outline">Outline</Chip>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Chip size="sm">小</Chip>
      <Chip size="default">默认</Chip>
      <Chip size="lg">大</Chip>
    </div>
  ),
}

export const Removable: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Chip removable onRemove={() => console.info("remove")}>可移除</Chip>
      <Chip variant="primary" removable onRemove={() => console.info("remove p")}>Primary 可移除</Chip>
      <Chip variant="success" removable onRemove={() => console.info("remove s")}>Success 可移除</Chip>
    </div>
  ),
}

export const Dark: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Chip variant="default">Default</Chip>
      <Chip variant="primary">Primary</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="destructive">Destructive</Chip>
      <Chip variant="outline">Outline</Chip>
    </div>
  ),
  parameters: { backgrounds: { default: "dark" } },
}
