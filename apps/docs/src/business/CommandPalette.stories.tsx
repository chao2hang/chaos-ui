import type { Meta, StoryObj } from "@storybook/react"
import { CommandPalette, type CommandGroup } from "@/components/business/command-palette"
import { useState } from "react"
import { Button } from "@chaos_team/chaos-ui/ui"
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  FileTextIcon,
  PlusIcon,
} from "lucide-react"

const meta = {
  title: "Business/CommandPalette",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const groups: CommandGroup[] = [
  {
    id: "nav",
    label: "导航",
    items: [
      { id: "home", label: "首页", icon: <HomeIcon className="size-4" />, shortcut: "mod+H" },
      { id: "settings", label: "设置", icon: <SettingsIcon className="size-4" />, shortcut: "mod+," },
      { id: "profile", label: "个人资料", icon: <UserIcon className="size-4" />, description: "查看并编辑您的资料" },
    ],
  },
  {
    id: "actions",
    label: "操作",
    items: [
      { id: "new", label: "新建文档", icon: <FileTextIcon className="size-4" />, keywords: ["create", "add"], shortcut: "mod+N" },
      { id: "invite", label: "邀请成员", icon: <PlusIcon className="size-4" />, description: "通过邮件邀请协作者" },
      { id: "disabled", label: "即将推出", disabled: true },
    ],
  },
]

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex h-[400px] items-start justify-center gap-3 p-10">
        <Button onClick={() => setOpen(true)}>打开命令面板</Button>
        <CommandPalette open={open} onOpenChange={setOpen} groups={groups} />
        <p className="text-xs text-muted-foreground">
          提示：按 ⌘/Ctrl + K 快速打开
        </p>
      </div>
    )
  },
}

export const OpenByDefault: Story = {
  render: () => (
    <div className="h-[400px] p-4">
      <CommandPalette open groups={groups} />
    </div>
  ),
}

export const Empty: Story = {
  render: () => (
    <div className="h-[400px] p-4">
      <CommandPalette open groups={[]} emptyText="暂无可用命令" />
    </div>
  ),
}

export const CustomShortcut: Story = {
  render: () => (
    <div className="h-[400px] p-4">
      <p className="mb-2 text-xs text-muted-foreground">按 ⌘/Ctrl + / 打开</p>
      <CommandPalette open groups={groups} shortcut="mod+/" />
    </div>
  ),
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
