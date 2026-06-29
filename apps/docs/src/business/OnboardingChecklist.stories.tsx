import type { Meta, StoryObj } from "@storybook/react"
import { OnboardingChecklist } from "@/components/business/onboarding-checklist"
import { useState } from "react"

const meta = {
  title: "Business/OnboardingChecklist",
  component: OnboardingChecklist,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof OnboardingChecklist>

export default meta
type Story = StoryObj<typeof meta>

const baseSteps = [
  { id: "welcome", title: "完成个人资料", description: "上传头像、填写简介" },
  { id: "team", title: "邀请 3 位团队成员", description: "通过邮件邀请" },
  { id: "project", title: "创建第一个项目", description: "选择模板快速开始" },
  { id: "integrate", title: "集成您的工具", description: "Slack、GitHub 等", optional: true },
]

export const Default: Story = {
  render: () => {
    const [done, setDone] = useState<string[]>(["welcome"])
    return (
      <div className="max-w-md">
        <OnboardingChecklist
          title="快速上手"
          steps={baseSteps}
          completedIds={done}
          onToggle={(id, completed) =>
            setDone((prev) => (completed ? [...prev, id] : prev.filter((d) => d !== id)))
          }
        />
      </div>
    )
  },
}

export const Empty: Story = {
  render: () => (
    <div className="max-w-md">
      <OnboardingChecklist steps={[]} />
    </div>
  ),
}

export const FullyComplete: Story = {
  render: () => (
    <div className="max-w-md">
      <OnboardingChecklist
        title="已完成"
        steps={baseSteps}
        completedIds={baseSteps.map((s) => s.id)}
      />
    </div>
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
