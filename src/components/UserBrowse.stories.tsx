import type { Meta, StoryObj } from "@storybook/react"
import { UserBrowse, type User } from "@/components/ui/user-browse"
import { useState } from "react"

const meta = {
  title: "Components/UserBrowse",
  component: UserBrowse,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof UserBrowse>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<User | undefined>()
    return (
      <div className="w-[300px]">
        <UserBrowse
          value={value}
          onChange={(next) => setValue(Array.isArray(next) ? undefined : next)}
          placeholder="Select user..."
        />
      </div>
    )
  },
}

export const WithDefault: Story = {
  args: {
    defaultValue: { id: "1", name: "John Doe", email: "john@example.com" },
  },
}

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<User[]>([])
    return (
      <div className="w-[300px]">
        <UserBrowse
          value={value}
          onChange={(next) => setValue(Array.isArray(next) ? next : next ? [next] : [])}
          multiple
          placeholder="Select users..."
        />
      </div>
    )
  },
}

export const WithMaxCount: Story = {
  render: () => (
    <div className="w-[300px]">
      <UserBrowse multiple maxCount={3} placeholder="Select up to 3 users..." />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: { id: "1", name: "John Doe", email: "john@example.com" },
  },
}
