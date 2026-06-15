import type { Meta, StoryObj } from "@storybook/react"
import { UserMenu } from "@/components/business/user-menu"
import {
  CreditCardIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
} from "lucide-react"

const meta = {
  title: "Business/UserMenu",
  component: UserMenu,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof UserMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    user: { name: "李雷", email: "li.lei@chaos.com", role: "高级工程师" },
  },
}

export const WithAvatar: Story = {
  args: {
    user: {
      name: "韩梅梅",
      email: "han@example.com",
      avatar: "https://i.pravatar.cc/100?img=5",
      role: "设计师",
    },
  },
}

export const WithCustomActions: Story = {
  args: {
    user: { name: "Alice", email: "alice@chaos.com" },
    actions: [
      { label: "控制台", icon: <LayoutDashboardIcon />, onClick: () => console.info("dash") },
      { label: "账单", icon: <CreditCardIcon />, onClick: () => console.info("billing") },
      { label: "帮助", icon: <HelpCircleIcon />, onClick: () => console.info("help") },
    ],
    onSignOut: () => console.info("signout"),
  },
}

export const Minimal: Story = {
  args: {
    user: { name: "Bob" },
    showProfile: false,
    showSettings: false,
    onSignOut: () => console.info("signout"),
  },
}

export const Dark: Story = {
  ...Default,
  parameters: { backgrounds: { default: "dark" } },
}
