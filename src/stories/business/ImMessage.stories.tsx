import type { Meta, StoryObj } from "@storybook/react";
import { ImMessage } from "@/components/business/im-message";

const meta = {
  title: "Business/Messaging/ImMessage",
  component: ImMessage,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ImMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sent: Story = {
  args: {
    direction: "sent",
    author: "You",
    content: "Hey, did you review the Q3 report?",
    timestamp: "10:30 AM",
  },
};

export const Received: Story = {
  args: {
    direction: "received",
    author: "Alice",
    content: "Yes, looks good! I left a few comments.",
    timestamp: "10:32 AM",
  },
};

export const WithAttachments: Story = {
  args: {
    direction: "received",
    author: "Bob",
    content: "Here's the updated spreadsheet.",
    timestamp: "11:00 AM",
    attachments: [
      { id: "1", name: "Q3-budget.xlsx", size: 245760 },
      { id: "2", name: "notes.pdf", size: 102400 },
    ],
  },
};

export const WithAvatar: Story = {
  args: {
    direction: "received",
    author: "Carol",
    content: "Great work on the launch!",
    timestamp: "Yesterday",
    avatarUrl: "https://picsum.photos/seed/carol/80/80",
  },
};
