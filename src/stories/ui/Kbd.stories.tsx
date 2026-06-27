import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  tags: ["autodocs", "a11y"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
      description: "The keyboard key size",
    },
  },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: "K" },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Kbd size="sm">Esc</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd size="lg">Shift</Kbd>
    </div>
  ),
}

export const ShortcutGroup: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
}

export const CommandPaletteHint: Story = {
  render: () => (
    <div className="flex w-full max-w-80 items-center justify-between gap-3 rounded-lg border p-3">
      <div>
        <div className="text-sm font-medium">Open command palette</div>
        <div className="text-xs text-muted-foreground">Search actions and pages</div>
      </div>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </div>
  ),
}

