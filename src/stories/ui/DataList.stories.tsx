import type { Meta, StoryObj } from "@storybook/react"
import { DataList, ListHeader, ListItem, ListFooter } from "@/components/ui"

const meta = {
  title: "Components/DataList",
  component: DataList,
  tags: ["autodocs"],
} satisfies Meta<typeof DataList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    bordered: true,
    children: (
      <>
        <ListHeader>Notifications</ListHeader>
        <ListItem extra="3m ago">New order received</ListItem>
        <ListItem description="Payment confirmed for order #1234" extra="1h ago">Order #1234</ListItem>
        <ListItem extra="Yesterday">Product review submitted</ListItem>
        <ListFooter>View all notifications</ListFooter>
      </>
    ),
  },
}

export const WithAvatar: Story = {
  args: {
    bordered: true,
    children: (
      <>
        <ListHeader>Team Members</ListHeader>
        <ListItem avatar={<div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium">JD</div>} description="john@acme.com">John Doe</ListItem>
        <ListItem avatar={<div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium">AS</div>} description="alice@acme.com">Alice Smith</ListItem>
      </>
    ),
  },
}

export const Horizontal: Story = {
  args: {
    direction: "horizontal" as const,
    children: (
      <>
        <ListItem>Item A</ListItem>
        <ListItem>Item B</ListItem>
        <ListItem>Item C</ListItem>
      </>
    ),
  },
}
