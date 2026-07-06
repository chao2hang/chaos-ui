import type { Meta, StoryObj } from "@storybook/react";
import { MessageList } from "@/components/business/message-list";

const messages = [
  { id: "1", title: "System update", content: "Scheduled maintenance on July 15.", type: "warning" as const, time: "10:00 AM", read: false },
  { id: "2", title: "New comment", content: "Alice commented on your report.", type: "info" as const, time: "9:45 AM", read: true },
  { id: "3", title: "Payment received", content: "$1,250.00 from Acme Inc.", type: "success" as const, time: "Yesterday" },
];

const meta = {
  title: "Business/Messaging/MessageList",
  component: MessageList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MessageList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { messages },
};

export const Empty: Story = {
  args: { messages: [] },
};

export const WithCallbacks: Story = {
  args: {
    messages,
    onSelect: (id) => { void id; },
    onMarkAllRead: () => {},
  },
};
