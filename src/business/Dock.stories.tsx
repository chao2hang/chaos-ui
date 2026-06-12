import type { Meta, StoryObj } from "@storybook/react"
import { Dock } from "@/components/business/dock"
import {
  HomeIcon,
  SearchIcon,
  BellIcon,
  MessageCircleIcon,
  UserIcon,
  SettingsIcon,
} from "lucide-react"
import { useState } from "react"

const meta = {
  title: "Business/Dock",
  component: Dock,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Dock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("home")
    return (
      <div className="flex h-40 items-end justify-center">
        <Dock
          items={[
            { key: "home", label: "首页", icon: <HomeIcon />, active: active === "home", onClick: () => setActive("home") },
            { key: "search", label: "搜索", icon: <SearchIcon />, active: active === "search", onClick: () => setActive("search") },
            { key: "messages", label: "消息", icon: <MessageCircleIcon />, badge: 3, active: active === "messages", onClick: () => setActive("messages") },
            { key: "notifications", label: "通知", icon: <BellIcon />, badge: 12, active: active === "notifications", onClick: () => setActive("notifications") },
            { key: "profile", label: "个人", icon: <UserIcon />, active: active === "profile", onClick: () => setActive("profile") },
            { key: "settings", label: "设置", icon: <SettingsIcon />, active: active === "settings", onClick: () => setActive("settings") },
          ]}
        />
      </div>
    )
  },
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-72 items-center justify-center">
      <Dock
        orientation="vertical"
        magnification={false}
        items={[
          { key: "1", label: "1", icon: <HomeIcon /> },
          { key: "2", label: "2", icon: <SearchIcon /> },
          { key: "3", label: "3", icon: <BellIcon />, badge: 5 },
        ]}
      />
    </div>
  ),
}

export const NoMagnification: Story = {
  render: () => (
    <div className="flex h-32 items-end justify-center">
      <Dock
        magnification={false}
        items={[
          { key: "1", label: "一", icon: <HomeIcon /> },
          { key: "2", label: "二", icon: <SearchIcon /> },
          { key: "3", label: "三", icon: <UserIcon /> },
        ]}
      />
    </div>
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
