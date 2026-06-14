import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BellIcon, CreditCardIcon, ShieldIcon } from "lucide-react"
import { UserMenu, type UserMenuAction } from "@/components/business/user-menu"

const actions: UserMenuAction[] = [
  {
    label: "Billing",
    icon: <CreditCardIcon className="size-4" />,
    onClick: () => alert("Opening billing"),
  },
  {
    label: "Security",
    icon: <ShieldIcon className="size-4" />,
    onClick: () => alert("Opening security"),
  },
  {
    label: "Muted notifications",
    icon: <BellIcon className="size-4" />,
    disabled: true,
  },
]

const meta = {
  title: "Business/UserMenu",
  component: UserMenu,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof UserMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    user: {
      name: "Mei Lin",
      email: "mei.lin@example.com",
      role: "Marketing admin",
    },
    actions,
    onProfile: () => alert("Opening profile"),
    onSettings: () => alert("Opening settings"),
    onSignOut: () => alert("Signing out"),
  },
  render: (args) => (
    <div className="flex min-h-64 justify-end p-6">
      <UserMenu {...args} />
    </div>
  ),
}

export const Minimal: Story = {
  args: {
    user: {
      name: "Noah Park",
      role: "Analyst",
    },
    showProfile: false,
    showSettings: false,
  },
  render: (args) => (
    <div className="flex min-h-64 justify-end p-6">
      <UserMenu {...args} />
    </div>
  ),
}

export const DestructiveAction: Story = {
  args: {
    user: {
      name: "Elena Rossi",
      email: "elena.rossi@example.com",
    },
    actions: [
      ...actions,
      {
        label: "Delete account",
        destructive: true,
        onClick: () => alert("Deleting account"),
      },
    ],
    onSignOut: () => alert("Signing out"),
  },
  render: (args) => (
    <div className="flex min-h-64 justify-end p-6">
      <UserMenu {...args} />
    </div>
  ),
}

