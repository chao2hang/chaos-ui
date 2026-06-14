import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Dot } from "@/components/ui/dot"

const meta = {
  title: "Components/Dot",
  component: Dot,
  tags: ["autodocs", "a11y"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
      description: "The dot size",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "primary", "success", "warning", "destructive", "info"],
      description: "The semantic color of the dot",
    },
    pulse: {
      control: "boolean",
      description: "Whether the dot shows a pulse animation",
    },
  },
} satisfies Meta<typeof Dot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Success: Story = {
  args: { variant: "success" },
}

export const Pulsing: Story = {
  args: { variant: "primary", pulse: true },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 text-sm">
        <Dot />
        Default
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Dot variant="primary" />
        Primary
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Dot variant="success" />
        Success
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Dot variant="warning" />
        Warning
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Dot variant="destructive" />
        Destructive
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Dot variant="info" />
        Info
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Dot size="sm" variant="primary" />
      <Dot variant="primary" />
      <Dot size="lg" variant="primary" />
    </div>
  ),
}

export const StatusList: Story = {
  render: () => (
    <div className="w-64 space-y-3 rounded-lg border p-4">
      <div className="flex items-center justify-between text-sm">
        API gateway
        <span className="flex items-center gap-2 text-muted-foreground">
          <Dot variant="success" pulse />
          Healthy
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        Queue worker
        <span className="flex items-center gap-2 text-muted-foreground">
          <Dot variant="warning" />
          Delayed
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        Billing sync
        <span className="flex items-center gap-2 text-muted-foreground">
          <Dot variant="destructive" />
          Failed
        </span>
      </div>
    </div>
  ),
}

