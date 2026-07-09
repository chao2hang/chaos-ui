import type { Meta, StoryObj } from "@storybook/react"
import { CoachMark } from "@/components/business/coach-mark"
import { Button } from "@chaos_team/chaos-ui/ui"
import { useRef, useState } from "react"

const meta: Meta<typeof CoachMark> = {
  title: "Business/CoachMark",
  component: CoachMark,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [target, setTarget] = useState<HTMLElement | null>(null)
    return (
      <div className="space-y-3">
        <Button
          ref={(el: HTMLElement | null) => setTarget(el)}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "隐藏" : "显示"} 气泡
        </Button>
        <CoachMark
          open={open}
          onOpenChange={setOpen}
          target={target}
          title="关键功能"
          description="这是一个上下文气泡提示，引导用户关注核心功能。"
          onNext={() => console.info("next")}
          onSkip={() => setOpen(false)}
        />
      </div>
    )
  },
}

export const Placements: Story = {
  render: () => {
    const ref = useRef<HTMLButtonElement>(null)
    const [open, setOpen] = useState(true)
    return (
      <div className="grid grid-cols-2 gap-12 p-12">
        <Button ref={ref}>目标元素</Button>
        <CoachMark
          open={open}
          onOpenChange={setOpen}
          target={ref.current}
          title="顶部"
          description="气泡出现在元素上方"
          placement="top"
        />
      </div>
    )
  },
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
