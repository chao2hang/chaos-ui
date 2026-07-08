import type { Meta, StoryObj } from "@storybook/react"
import { Label } from "@/components/ui/label"

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    htmlFor: {
      control: "text",
      description: "The id of the element the label is for",
    },
  },

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Label",
  },
}

export const WithInput: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="username">Username</Label>
      <input id="username" className="flex h-8 w-full rounded-md border border-input bg-transparent px-2.5" />
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <Label>
      Email <span className="text-destructive">*</span>
    </Label>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="group" data-disabled="true">
      <Label>Disabled Label</Label>
    </div>
  ),
}
