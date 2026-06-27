import type { Meta, StoryObj } from "@storybook/react"
import { Separator } from "@/components/ui/separator"

const meta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs", "a11y"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "The orientation of the separator",
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <div className="text-sm">Content above</div>
      <Separator className="my-4" />
      <div className="text-sm">Content below</div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center space-x-4">
      <div className="text-sm">Left</div>
      <Separator orientation="vertical" />
      <div className="text-sm">Right</div>
    </div>
  ),
}

export const InMenu: Story = {
  render: () => (
    <div className="w-56 p-2 border rounded-lg">
      <div className="px-2 py-1.5 text-sm">Profile</div>
      <div className="px-2 py-1.5 text-sm">Settings</div>
      <Separator className="my-1" />
      <div className="px-2 py-1.5 text-sm">Help</div>
      <Separator className="my-1" />
      <div className="px-2 py-1.5 text-sm text-destructive">Logout</div>
    </div>
  ),
}

