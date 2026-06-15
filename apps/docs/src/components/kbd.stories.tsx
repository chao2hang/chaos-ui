import type { Meta, StoryObj } from "@storybook/react"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
      description: "Size of the kbd key",
    },
  },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Kbd>K</Kbd>,
}

export const Small: Story = {
  render: () => <Kbd size="sm">K</Kbd>,
}

export const Large: Story = {
  render: () => <Kbd size="lg">K</Kbd>,
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <Kbd size="sm">⌘</Kbd>
      <Kbd size="default">⌘</Kbd>
      <Kbd size="lg">⌘</Kbd>
    </div>
  ),
}

export const ShortcutGroup: Story = {
  name: "Combination (KbdGroup)",
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
  ),
}

export const CommonShortcuts: Story = {
  name: "Common Shortcuts",
  render: () => (
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex items-center gap-3">
        <span className="w-32 text-muted-foreground">Copy</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>C</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-32 text-muted-foreground">Paste</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>V</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-32 text-muted-foreground">Command palette</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-32 text-muted-foreground">Search files</span>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>
      </div>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <KbdGroup>
        <Kbd size="sm">⌘</Kbd>
        <Kbd size="sm">K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd size="lg">⌘</Kbd>
        <Kbd size="lg">K</Kbd>
      </KbdGroup>
    </div>
  ),
}

export const Dark: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <div className="dark flex flex-col gap-3">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>Enter</Kbd>
      </KbdGroup>
    </div>
  ),
}
