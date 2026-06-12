import type { Meta, StoryObj } from "@storybook/react"
import { Menubar } from "@/components/ui/menubar"

const meta = {
  title: "Components/Menubar",
  component: Menubar,
  tags: ["autodocs"],
} satisfies Meta<typeof Menubar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Menubar>
      <span className="px-3 text-sm">File</span>
      <span className="px-3 text-sm">Edit</span>
      <span className="px-3 text-sm">View</span>
      <span className="px-3 text-sm">Help</span>
    </Menubar>
  ),
}

export const WithDisabled: Story = {
  render: () => (
    <Menubar disabled>
      <span className="px-3 text-sm">File</span>
      <span className="px-3 text-sm">Edit</span>
      <span className="px-3 text-sm">View</span>
    </Menubar>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Menubar orientation="vertical" className="h-64 w-32 flex-col items-stretch">
      <span className="px-3 py-1 text-sm">File</span>
      <span className="px-3 py-1 text-sm">Edit</span>
      <span className="px-3 py-1 text-sm">View</span>
    </Menubar>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Menubar>
        <span className="px-3 text-sm">File</span>
        <span className="px-3 text-sm">Edit</span>
        <span className="px-3 text-sm">View</span>
      </Menubar>
      <Menubar disabled>
        <span className="px-3 text-sm">Disabled</span>
      </Menubar>
    </div>
  ),
}

export const Dark: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <div className="dark">
      <Menubar>
        <span className="px-3 text-sm">File</span>
        <span className="px-3 text-sm">Edit</span>
        <span className="px-3 text-sm">View</span>
      </Menubar>
    </div>
  ),
}
