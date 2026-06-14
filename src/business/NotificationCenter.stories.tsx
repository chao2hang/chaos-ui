import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  NotificationCenter,
  type NotificationItem,
} from "@/components/business/notification-center"

const initialNotifications: NotificationItem[] = [
  {
    id: "n-1",
    title: "Campaign approved",
    description: "Summer launch is ready to schedule.",
    timestamp: new Date(2026, 5, 13, 9, 15),
    type: "success",
    read: false,
    action: { label: "View", onClick: () => alert("Opening campaign approval") },
  },
  {
    id: "n-2",
    title: "Budget pacing warning",
    description: "Paid social has spent 82% of its weekly budget.",
    timestamp: new Date(2026, 5, 13, 8, 20),
    type: "warning",
    read: false,
  },
  {
    id: "n-3",
    title: "Export completed",
    description: "Audience CSV is ready to download.",
    timestamp: new Date(2026, 5, 12, 17, 45),
    type: "info",
    read: true,
  },
  {
    id: "n-4",
    title: "Sync failed",
    description: "Retry the warehouse sync before publishing.",
    timestamp: new Date(2026, 5, 12, 14, 10),
    type: "error",
    read: false,
  },
]

const meta = {
  title: "Business/NotificationCenter",
  component: NotificationCenter,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof NotificationCenter>

export default meta
type Story = StoryObj<typeof meta>
type NotificationCenterProps = React.ComponentProps<typeof NotificationCenter>

function NotificationCenterDemo(args: NotificationCenterProps) {
  const [notifications, setNotifications] = React.useState(args.notifications)
  const [lastClicked, setLastClicked] = React.useState<string | null>(null)

  return (
    <div className="flex min-h-80 justify-end p-6">
      <div className="flex flex-col items-end gap-3">
        <NotificationCenter
          {...args}
          notifications={notifications}
          onMarkRead={(id) => {
            setNotifications((items) =>
              items.map((item) => (item.id === id ? { ...item, read: true } : item))
            )
            args.onMarkRead?.(id)
          }}
          onMarkAllRead={() => {
            setNotifications((items) => items.map((item) => ({ ...item, read: true })))
            args.onMarkAllRead?.()
          }}
          onClear={() => {
            setNotifications([])
            args.onClear?.()
          }}
          onItemClick={(item) => {
            setLastClicked(item.title)
            args.onItemClick?.(item)
          }}
        />
        {lastClicked && (
          <p className="text-xs text-muted-foreground">Last clicked: {lastClicked}</p>
        )}
      </div>
    </div>
  )
}

export const Default: Story = {
  args: {
    notifications: initialNotifications,
  },
  render: (args) => <NotificationCenterDemo {...args} />,
}

export const AllRead: Story = {
  args: {
    notifications: initialNotifications.map((item) => ({ ...item, read: true })),
  },
  render: (args) => <NotificationCenterDemo {...args} />,
}

export const Empty: Story = {
  args: {
    notifications: [],
    emptyText: "All caught up",
  },
  render: (args) => <NotificationCenterDemo {...args} />,
}

