import type { Meta, StoryObj } from "@storybook/react"
import { Confetti } from "@/components/business/confetti"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const meta: Meta<typeof Confetti> = {
  title: "Business/Confetti",
  component: Confetti,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [trigger, setTrigger] = useState(0)
    return (
      <div className="relative h-64 overflow-hidden rounded-md border bg-muted/20">
        <Confetti trigger={trigger} />
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <Button onClick={() => setTrigger((n) => n + 1)}>
            触发庆祝
          </Button>
          <p className="text-xs text-muted-foreground">点击按钮触发彩带（可多次点击）</p>
        </div>
      </div>
    )
  },
}

export const HighCount: Story = {
  render: () => {
    const [trigger, setTrigger] = useState(0)
    return (
      <div className="relative h-64 overflow-hidden rounded-md border bg-muted/20">
        <Confetti trigger={trigger} count={150} duration={4000} />
        <div className="flex h-full items-center justify-center">
          <Button onClick={() => setTrigger((n) => n + 1)}>
            触发大量彩带
          </Button>
        </div>
      </div>
    )
  },
}

export const Static: Story = {
  args: { trigger: 1, count: 30 },
  render: (args) => (
    <div className="relative h-64 overflow-hidden rounded-md border bg-muted/20">
      <Confetti {...args} />
      <p className="p-4 text-xs text-muted-foreground">活跃态预览</p>
    </div>
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
