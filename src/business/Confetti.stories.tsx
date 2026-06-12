import type { Meta, StoryObj } from "@storybook/react"
import { Confetti } from "@/components/business/confetti"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const meta = {
  title: "Business/Confetti",
  component: Confetti,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Confetti>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState(false)
    return (
      <div className="relative h-64 overflow-hidden rounded-md border bg-muted/20">
        <Confetti active={active} />
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <Button
            onClick={() => {
              setActive(true)
              setTimeout(() => setActive(false), 3000)
            }}
          >
            触发庆祝
          </Button>
          <p className="text-xs text-muted-foreground">点击按钮触发 3 秒彩带</p>
        </div>
      </div>
    )
  },
}

export const HighCount: Story = {
  render: () => {
    const [active, setActive] = useState(false)
    return (
      <div className="relative h-64 overflow-hidden rounded-md border bg-muted/20">
        <Confetti active={active} count={150} duration={4000} />
        <div className="flex h-full items-center justify-center">
          <Button
            onClick={() => {
              setActive(true)
              setTimeout(() => setActive(false), 4000)
            }}
          >
            触发大量彩带
          </Button>
        </div>
      </div>
    )
  },
}

export const Static: Story = {
  args: { active: true, count: 30 },
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
