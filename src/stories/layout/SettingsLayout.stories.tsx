import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SettingsLayout } from "@/components/layout/settings-layout";
import { UserIcon, ShieldIcon, BellIcon } from "@/components/ui/icons";

const nav = [
  {
    key: "profile",
    label: "个人资料",
    description: "头像、昵称",
    icon: <UserIcon className="size-4" />,
  },
  {
    key: "security",
    label: "安全",
    description: "密码与 2FA",
    icon: <ShieldIcon className="size-4" />,
  },
  {
    key: "notify",
    label: "通知",
    icon: <BellIcon className="size-4" />,
  },
  {
    key: "appearance",
    label: "外观",
  },
];

const meta = {
  title: "Layout/SettingsLayout",
  component: SettingsLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Settings page shell with searchable sidebar navigation and content pane.",
      },
    },
  },
} satisfies Meta<typeof SettingsLayout>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [key, setKey] = useState("profile");
    return (
      <div className="min-h-[480px] border">
        <SettingsLayout
          nav={nav}
          activeKey={key}
          onNavChange={setKey}
          title={nav.find((n) => n.key === key)?.label}
          description="管理账户与偏好"
          searchable
        >
          <p className="text-muted-foreground text-sm">当前分区：{key}</p>
        </SettingsLayout>
      </div>
    );
  },
};

export const WithoutSearch: Story = {
  args: {
    nav,
    searchable: false,
    title: "系统设置",
    children: <div>内容区</div>,
  },
};
