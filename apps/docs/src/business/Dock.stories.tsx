import type { Meta, StoryObj } from "@storybook/react"
import { Dock } from "@/components/business/dock"
import {
  HomeIcon,
  SearchIcon,
  BellIcon,
  MessageCircleIcon,
  UserIcon,
  SettingsIcon,
  HeartIcon,
  StarIcon,
  BookmarkIcon,
  CalendarIcon,
  MailIcon,
  MusicIcon,
} from "lucide-react"
import { useState } from "react"

const meta: Meta<typeof Dock> = {
  title: "Business/Dock",
  component: Dock,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("home")
    return (
      <div className="flex h-48 items-end justify-center pb-8">
        <Dock
          items={[
            { key: "home", label: "首页", icon: <HomeIcon className="size-5" />, active: active === "home", onClick: () => setActive("home") },
            { key: "search", label: "搜索", icon: <SearchIcon className="size-5" />, active: active === "search", onClick: () => setActive("search") },
            { key: "messages", label: "消息", icon: <MessageCircleIcon className="size-5" />, badge: 3, active: active === "messages", onClick: () => setActive("messages") },
            { key: "notifications", label: "通知", icon: <BellIcon className="size-5" />, badge: 12, active: active === "notifications", onClick: () => setActive("notifications") },
            { key: "favorites", label: "收藏", icon: <HeartIcon className="size-5" />, active: active === "favorites", onClick: () => setActive("favorites") },
            { key: "profile", label: "个人", icon: <UserIcon className="size-5" />, active: active === "profile", onClick: () => setActive("profile") },
            { key: "settings", label: "设置", icon: <SettingsIcon className="size-5" />, active: active === "settings", onClick: () => setActive("settings") },
          ]}
        />
      </div>
    )
  },
}

export const Vertical: Story = {
  render: () => {
    const [active, setActive] = useState("home")
    return (
      <div className="flex h-96 items-center justify-center">
        <Dock
          orientation="vertical"
          magnification={true}
          items={[
            { key: "home", label: "首页", icon: <HomeIcon className="size-5" />, active: active === "home", onClick: () => setActive("home") },
            { key: "search", label: "搜索", icon: <SearchIcon className="size-5" />, active: active === "search", onClick: () => setActive("search") },
            { key: "messages", label: "消息", icon: <MessageCircleIcon className="size-5" />, badge: 5, active: active === "messages", onClick: () => setActive("messages") },
            { key: "notifications", label: "通知", icon: <BellIcon className="size-5" />, active: active === "notifications", onClick: () => setActive("notifications") },
            { key: "calendar", label: "日历", icon: <CalendarIcon className="size-5" />, active: active === "calendar", onClick: () => setActive("calendar") },
            { key: "mail", label: "邮件", icon: <MailIcon className="size-5" />, badge: 99, active: active === "mail", onClick: () => setActive("mail") },
            { key: "music", label: "音乐", icon: <MusicIcon className="size-5" />, active: active === "music", onClick: () => setActive("music") },
            { key: "settings", label: "设置", icon: <SettingsIcon className="size-5" />, active: active === "settings", onClick: () => setActive("settings") },
          ]}
        />
      </div>
    )
  },
}

export const NoMagnification: Story = {
  render: () => {
    const [active, setActive] = useState("home")
    return (
      <div className="flex h-48 items-end justify-center pb-8">
        <Dock
          magnification={false}
          items={[
            { key: "home", label: "首页", icon: <HomeIcon className="size-5" />, active: active === "home", onClick: () => setActive("home") },
            { key: "search", label: "搜索", icon: <SearchIcon className="size-5" />, active: active === "search", onClick: () => setActive("search") },
            { key: "bookmarks", label: "书签", icon: <BookmarkIcon className="size-5" />, active: active === "bookmarks", onClick: () => setActive("bookmarks") },
            { key: "starred", label: "星标", icon: <StarIcon className="size-5" />, badge: 7, active: active === "starred", onClick: () => setActive("starred") },
            { key: "profile", label: "个人", icon: <UserIcon className="size-5" />, active: active === "profile", onClick: () => setActive("profile") },
          ]}
        />
      </div>
    )
  },
}

export const Minimal: Story = {
  render: () => {
    const [active, setActive] = useState("home")
    return (
      <div className="flex h-48 items-end justify-center pb-8">
        <Dock
          items={[
            { key: "home", label: "首页", icon: <HomeIcon className="size-5" />, active: active === "home", onClick: () => setActive("home") },
            { key: "search", label: "搜索", icon: <SearchIcon className="size-5" />, active: active === "search", onClick: () => setActive("search") },
            { key: "profile", label: "个人", icon: <UserIcon className="size-5" />, active: active === "profile", onClick: () => setActive("profile") },
          ]}
        />
      </div>
    )
  },
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}

export const DarkVertical: Story = {
  ...Vertical,
  parameters: { backgrounds: { default: "dark" } },
}
