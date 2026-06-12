import type { Meta, StoryObj } from "@storybook/react"
import { AnimatedNumber } from "@/components/business/animated-number"
import { Confetti } from "@/components/business/confetti"
import { CoachMark } from "@/components/business/coach-mark"
import { DensitySwitcher } from "@/components/business/density-switcher"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"

export default {
  title: "Business/Microinteractions",
  parameters: { layout: "padded" },
} satisfies Meta

export const AnimatedNumberExample: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">AnimatedNumber 数字滚动</h3>
      <div className="grid grid-cols-3 gap-4 text-3xl font-bold tabular-nums">
        <div>
          <div className="text-xs font-normal text-muted-foreground">收入</div>
          <AnimatedNumber value={1234567} duration={2000} prefix="¥" />
        </div>
        <div>
          <div className="text-xs font-normal text-muted-foreground">增长</div>
          <AnimatedNumber value={42.7} decimals={1} suffix="%" duration={1500} />
        </div>
        <div>
          <div className="text-xs font-normal text-muted-foreground">用户数</div>
          <AnimatedNumber value={9805} duration={1800} />
        </div>
      </div>
    </div>
  ),
}

export const ConfettiExample: StoryObj = {
  render: () => {
    const [active, setActive] = useState(false)
    return (
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Confetti 庆祝</h3>
        <div className="relative h-48 overflow-hidden rounded-md border bg-muted/20">
          <Confetti active={active} />
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <Button
              onClick={() => {
                setActive(true)
                setTimeout(() => setActive(false), 3000)
              }}
            >
              🎉 触发庆祝
            </Button>
            <p className="text-xs text-muted-foreground">点击按钮触发 3 秒彩带</p>
          </div>
        </div>
      </div>
    )
  },
}

export const CoachMarkExample: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [ref, setRef] = useState<HTMLElement | null>(null)
    return (
      <div className="space-y-3">
        <h3 className="text-sm font-medium">CoachMark 上下文气泡</h3>
        <Button ref={setRef} onClick={() => setOpen((v) => !v)}>
          {open ? "隐藏" : "显示"} 气泡提示
        </Button>
        <CoachMark
          open={open}
          onOpenChange={setOpen}
          target={ref}
          title="关键功能"
          description="这是一个上下文气泡提示，用于引导用户关注核心功能。可放在任意元素旁。"
          onNext={() => toast.success("已记录")}
          onSkip={() => setOpen(false)}
        />
      </div>
    )
  },
}

export const DensityExample: StoryObj = {
  render: () => {
    const [d, setD] = useState<"compact" | "default" | "comfortable">("default")
    return (
      <div className="space-y-3">
        <h3 className="text-sm font-medium">DensitySwitcher 密度切换</h3>
        <div className="flex gap-2">
          <DensitySwitcher density={d === "compact" ? "compact" : "default"} open={d === "compact"} onChange={(o) => o ? setD("compact") : setD("default")} />
          <DensitySwitcher density="default" open={d === "default"} onChange={(o) => o ? setD("default") : setD("compact")} />
          <DensitySwitcher density="comfortable" open={d === "comfortable"} onChange={(o) => o ? setD("comfortable") : setD("default")} />
        </div>
        <p className="text-xs text-muted-foreground">当前：{d}</p>
      </div>
    )
  },
}

export const AllVariants: StoryObj = {
  render: () => (
    <div className="max-w-4xl space-y-8">
      <section>
        <h3 className="mb-3 text-base font-semibold">AnimatedNumber 数字滚动</h3>
        <div className="grid grid-cols-3 gap-6 text-2xl font-bold tabular-nums">
          <div>
            <div className="text-xs font-normal text-muted-foreground">收入</div>
            <AnimatedNumber value={1234567} duration={2000} prefix="¥" />
          </div>
          <div>
            <div className="text-xs font-normal text-muted-foreground">增长</div>
            <AnimatedNumber value={42.7} decimals={1} suffix="%" duration={1500} />
          </div>
          <div>
            <div className="text-xs font-normal text-muted-foreground">用户</div>
            <AnimatedNumber value={9805} duration={1800} />
          </div>
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">Density Switcher</h3>
        <div className="flex gap-2">
          <DensitySwitcher open={false} />
          <DensitySwitcher open />
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">Coach Mark（点击下方按钮）</h3>
        <CoachMarkSection />
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">Confetti（点击按钮触发）</h3>
        <ConfettiSection />
      </section>
    </div>
  ),
}

function CoachMarkSection() {
  const [open, setOpen] = useState(false)
  const [ref, setRef] = useState<HTMLElement | null>(null)
  return (
    <div>
      <Button ref={setRef} onClick={() => setOpen((v) => !v)}>
        {open ? "隐藏" : "显示"} 气泡
      </Button>
      <CoachMark
        open={open}
        onOpenChange={setOpen}
        target={ref}
        title="关键功能"
        description="上下文气泡提示，引导用户关注。"
        onNext={() => toast.success("下一步")}
        onSkip={() => setOpen(false)}
      />
    </div>
  )
}

function ConfettiSection() {
  const [active, setActive] = useState(false)
  return (
    <div className="relative h-40 overflow-hidden rounded-md border bg-muted/20">
      <Confetti active={active} />
      <div className="flex h-full items-center justify-center">
        <Button
          onClick={() => {
            setActive(true)
            setTimeout(() => setActive(false), 3000)
          }}
        >
          🎉 触发
        </Button>
      </div>
    </div>
  )
}
