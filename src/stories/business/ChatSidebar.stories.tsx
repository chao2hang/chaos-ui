import type { Meta, StoryObj } from "@storybook/react";
import { ChatSidebar } from "@/components/business/chat-sidebar";

const meta = {
  title: "Business/Chat/ChatSidebar",
  component: ChatSidebar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Sample data                                                               */
/* -------------------------------------------------------------------------- */

const conversations = [
  {
    id: "1",
    title: "TCP vs UDP explained",
    lastMessage: "UDP is typically preferred...",
    time: "09:03",
  },
  {
    id: "2",
    title: "Merkle tree deep-dive",
    lastMessage: "In O(log n) space...",
    time: "昨天",
    unread: 2,
  },
  {
    id: "3",
    title: "React 19 migration",
    lastMessage: "Let's start with the new hooks.",
    time: "周三",
  },
  {
    id: "4",
    title: "Docker networking guide",
    lastMessage: "You'll want a bridge network.",
    time: "上周",
  },
  {
    id: "5",
    title: "Quick question about SSH",
    lastMessage: "Use -i to specify the key.",
    time: "7/1",
  },
];

const noop = (id: string) => {
  void id;
};

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Sidebar with 5 conversations and the first active. */
export const Default: Story = {
  args: {
    conversations,
    activeId: "1",
    onSelect: noop,
  },
};

/** Conversation with unread badge highlighted. */
export const WithUnread: Story = {
  args: {
    conversations,
    activeId: "2",
    onSelect: noop,
  },
};

/** Empty sidebar (no conversations yet). */
export const Empty: Story = {
  args: {
    conversations: [],
    onSelect: noop,
  },
};

/** Single conversation. */
export const Single: Story = {
  args: {
    conversations: [
      {
        id: "1",
        title: "Hello, world!",
        lastMessage: "Hi there!",
        time: "now",
      },
    ],
    activeId: "1",
    onSelect: noop,
  },
};
