import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { ChatShell } from "@/components/business/chat-shell";
import { ChatHeader } from "@/components/business/chat-header";
import { ChatSidebar } from "@/components/business/chat-sidebar";
import { ChatConversation } from "@/components/business/chat-conversation";
import { ChatContextPanel } from "@/components/business/chat-context-panel";

const meta = {
  title: "Business/Chat/ChatShell",
  component: ChatShell,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ChatShell>;

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
];

const messages = [
  {
    id: "1",
    role: "user",
    content: "What's the difference between TCP and UDP?",
    time: "09:01",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "TCP is connection-oriented and guarantees ordered delivery. UDP is fire-and-forget.",
    time: "09:01",
  },
  {
    id: "3",
    role: "user",
    content: "Which should I use for video streaming?",
    time: "09:03",
  },
  {
    id: "4",
    role: "assistant",
    content:
      "UDP is typically preferred — it tolerates packet loss better than TCP for real-time media.",
    time: "09:03",
  },
];

const context = [
  { label: "Model", value: "gpt-4o" },
  { label: "Tokens", value: "1,240 / 8,192" },
  { label: "Session", value: "sess_a3f9c2" },
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Full three-panel chat shell — sidebar + main + context. */
export const FullLayout: Story = {
  args: {
    sidebar: <ChatSidebar conversations={conversations} activeId="1" />,
    header: (
      <ChatHeader
        title="TCP vs UDP explained"
        subtitle="gpt-4o"
        status="Online"
        actions={
          <Button size="sm" variant="outline">
            Share
          </Button>
        }
      />
    ),
    children: <ChatConversation messages={messages} />,
    detailPanel: <ChatContextPanel context={context} />,
    className: "h-screen",
  },
};

/** Two-panel layout — no context panel. */
export const NoDetailPanel: Story = {
  args: {
    sidebar: <ChatSidebar conversations={conversations} activeId="2" />,
    header: <ChatHeader title="Merkle tree deep-dive" />,
    children: <ChatConversation messages={messages} />,
    className: "h-screen",
  },
};

/** Main content only — hero chat view. */
export const MainOnly: Story = {
  args: {
    header: <ChatHeader title="New Conversation" />,
    children: <ChatConversation messages={messages} />,
    className: "h-screen",
  },
};
