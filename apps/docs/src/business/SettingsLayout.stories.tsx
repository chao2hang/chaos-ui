import type { Meta, StoryObj } from "@storybook/react";
import { SettingsLayout } from "@/components/business/settings-layout";
import type { SettingsNavEntry } from "@/components/business/settings-layout";
import { Button } from "@chaos_team/chaos-ui/ui";
import { Input } from "@chaos_team/chaos-ui/ui";
import { useState } from "react";
import {
  BellIcon,
  CreditCardIcon,
  DatabaseIcon,
  GlobeIcon,
  LockIcon,
  PaletteIcon,
  ServerIcon,
  SettingsIcon,
  ShieldIcon,
  UserIcon,
  UsersIcon,
  WebhookIcon,
} from "lucide-react";

const meta: Meta<typeof SettingsLayout> = {
  title: "Business/SettingsLayout",
  component: SettingsLayout,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("account");
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
              <div className="text-muted-foreground space-y-3 text-sm">
                <p>语言、主题、通知等偏好</p>
              </div>
            ),
          },
          {
            key: "security",
            title: "安全",
            description: "保护您的账户",
            content: (
              <p className="text-muted-foreground text-sm">
                两步验证、登录设备等
              </p>
            ),
          },
        ]}
      />
    );
  },
};

export const ThreeLevel: Story = {
  render: () => {
    const [active, setActive] = useState("profile");
    const nav: SettingsNavEntry[] = [
      {
        key: "user",
        label: "用户设置",
        icon: <UserIcon />,
        defaultOpen: true,
        children: [
          { key: "profile", label: "个人资料" },
          { key: "avatar", label: "头像" },
          {
            key: "privacy",
            label: "隐私",
            icon: <ShieldIcon />,
            defaultOpen: true,
            children: [
              { key: "visibility", label: "可见性" },
              { key: "blocking", label: "屏蔽管理" },
              { key: "data-export", label: "数据导出" },
            ],
          },
        ],
      },
      {
        key: "system",
        label: "系统设置",
        icon: <SettingsIcon />,
        children: [
          {
            key: "appearance",
            label: "外观",
            icon: <PaletteIcon />,
            children: [
              { key: "theme", label: "主题", badge: "新" },
              { key: "layout", label: "布局" },
              { key: "font-size", label: "字体大小" },
            ],
          },
          { key: "language", label: "语言", icon: <GlobeIcon /> },
          {
            key: "integrations",
            label: "集成",
            icon: <WebhookIcon />,
            children: [
              { key: "api-keys", label: "API 密钥" },
              { key: "webhooks", label: "Webhooks" },
            ],
          },
        ],
      },
      {
        key: "infra",
        label: "基础设施",
        icon: <ServerIcon />,
        children: [
          { key: "database", label: "数据库", icon: <DatabaseIcon /> },
          { key: "storage", label: "存储" },
        ],
      },
    ];
    return (
      <SettingsLayout
        nav={nav}
        active={active}
        onNavChange={setActive}
        sections={[
          {
            key: active,
            title: `${active} 设置`,
            content: (
              <p className="text-muted-foreground text-sm">
                当前选中: {active}
              </p>
            ),
          },
        ]}
      />
    );
  },
};

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
          content: <p className="text-muted-foreground text-sm">账户信息</p>,
        },
        {
          key: "team",
          title: "团队",
          content: <p className="text-muted-foreground text-sm">团队管理</p>,
        },
      ]}
    />
  ),
};

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
};

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
};
