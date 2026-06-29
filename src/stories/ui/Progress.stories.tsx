import type { Meta, StoryObj } from "@storybook/react"
import { Progress } from "@/components/ui/progress"

const meta = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs", "a11y"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "The progress value (0-100)",
    },
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj

export const Default: Story = {
  args: { value: 50 },
}

export const Empty: Story = {
  args: { value: 0 },
}

export const Complete: Story = {
  args: { value: 100 },
}

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <Progress value={0} />
      <Progress value={25} />
      <Progress value={50} />
      <Progress value={75} />
      <Progress value={100} />
    </div>
  ),
}

