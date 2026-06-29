import type { Meta, StoryObj } from "@storybook/react"
import { Notification } from "@/components/ui/notification"

const meta = {
  title: "Components/Notification",
  component: Notification,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error"],
    },
  },
} satisfies Meta<typeof Notification>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    type: "info",
    title: "Tip",
    children: "You can customize your dashboard layout from settings.",
  },
}

export const Success: Story = {
  args: {
    type: "success",
    title: "Saved",
    children: "Your changes have been saved successfully.",
  },
}

export const Warning: Story = {
  args: {
    type: "warning",
    title: "Session Expiring",
    children: "Your session will expire in 5 minutes. Save your work.",
  },
}

export const Error: Story = {
  args: {
    type: "error",
    title: "Upload Failed",
    children: "The file could not be uploaded. Please try again.",
  },
}

export const Banner: Story = {
  args: {
    type: "info",
    banner: true,
    children: "System maintenance scheduled for Sunday 2:00 AM - 4:00 AM.",
  },
}
