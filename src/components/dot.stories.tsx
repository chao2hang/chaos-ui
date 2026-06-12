import type { Meta, StoryObj } from "@storybook/react"
import { Dot } from "@/components/ui/dot"

const meta = {
  title: "Components/Dot",
  component: Dot,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
      description: "Size of the dot",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "primary", "success", "warning", "destructive", "info"],
      description: "Color variant",
    },
    pulse: {
      control: "boolean",
      description: "Whether to render the pulse animation",
    },
  },
} satisfies Meta<typeof Dot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Dot />,
}

export const Primary: Story = {
  render: () => <Dot variant="primary" />,
}

export const Success: Story = {
  render: () => <Dot variant="success" />,
}

export const Warning: Story = {
  render: () => <Dot variant="warning" />,
}

export const Destructive: Story = {
  render: () => <Dot variant="destructive" />,
}

export const Info: Story = {
  render: () => <Dot variant="info" />,
}

export const Pulse: Story = {
  name: "With Pulse",
  render: () => (
    <div className="flex items-center gap-3">
      <Dot variant="primary" pulse />
      <span className="text-sm">Live updates</span>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Dot size="sm" />
      <Dot size="default" />
      <Dot size="lg" />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2"><Dot variant="default" /><span className="text-xs">default</span></div>
      <div className="flex items-center gap-2"><Dot variant="primary" /><span className="text-xs">primary</span></div>
      <div className="flex items-center gap-2"><Dot variant="success" /><span className="text-xs">success</span></div>
      <div className="flex items-center gap-2"><Dot variant="warning" /><span className="text-xs">warning</span></div>
      <div className="flex items-center gap-2"><Dot variant="destructive" /><span className="text-xs">destructive</span></div>
      <div className="flex items-center gap-2"><Dot variant="info" /><span className="text-xs">info</span></div>
    </div>
  ),
}

export const Dark: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <div className="dark flex items-center gap-4">
      <Dot variant="default" />
      <Dot variant="primary" />
      <Dot variant="success" />
      <Dot variant="warning" />
      <Dot variant="destructive" />
      <Dot variant="info" />
    </div>
  ),
}
