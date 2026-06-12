import type { Meta, StoryObj } from "@storybook/react"
import { SettingsLayout } from "@/components/business/settings-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
  BellIcon,
  CreditCardIcon,
  LockIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react"

const meta = {
  title: "Business/SettingsLayout",
  component: SettingsLayout,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof SettingsLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("account")
    return (
      <SettingsLayout
        nav={[
          { key: "account", label: "账户", icon: <UserIcon /> },
          { key: "preferences", label: "偏好", icon: <SettingsIcon /> },
          { key: "security", label: "安全", icon: <LockIcon />, badge: "新" },
          { key: "billing", label: "账单", icon: <CreditCardIcon /> },
          { key: "team", label: "团队", icon: <UsersIcon /> },
          { key: "notifications", label: "通知", icon: <BellIcon /> },
        ]}
        active={active}
        onNavChange={setActive}
        sections={[
          {
            key: "account",
            title: "账户设置",
            description: "管理您的账户信息",
            content: (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">姓名</label>
                  <Input defaultValue="李雷" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">邮箱</label>
                  <Input defaultValue="li.lei@chaos.com" />
                </div>
                <Button>保存</Button>
              </div>
            ),
          },
          {
            key: "preferences",
            title: "偏好设置",
            description: "个性化您的体验",
            content: (
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>语言、主题、通知等偏好</p>
              </div>
            ),
          },
          {
            key: "security",
            title: "安全",
            description: "保护您的账户",
            content: (
              <p className="text-sm text-muted-foreground">两步验证、登录设备等</p>
            ),
          },
        ]}
      />
    )
  },
}

export const SingleSection: Story = {
  render: () => (
    <SettingsLayout
      nav={[
        { key: "account", label: "账户" },
        { key: "team", label: "团队" },
      ]}
      active="account"
      sections={[
        {
          key: "account",
          title: "账户",
          content: <p className="text-sm text-muted-foreground">账户信息</p>,
        },
        {
          key: "team",
          title: "团队",
          content: <p className="text-sm text-muted-foreground">团队管理</p>,
        },
      ]}
    />
  ),
}

export const WithBadges: Story = {
  render: () => (
    <SettingsLayout
      nav={[
        { key: "inbox", label: "收件箱", badge: 12 },
        { key: "drafts", label: "草稿", badge: "新" },
        { key: "sent", label: "已发送" },
      ]}
      active="inbox"
      sections={[
        {
          key: "inbox",
          title: "收件箱",
          content: <p>邮件列表</p>,
        },
      ]}
    />
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
