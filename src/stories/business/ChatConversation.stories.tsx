import type { Meta, StoryObj } from "@storybook/react";
import { ChatConversation } from "@/components/business/chat-conversation";

const meta = {
  title: "Business/Chat/ChatConversation",
  component: ChatConversation,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatConversation>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Sample data                                                               */
/* -------------------------------------------------------------------------- */

const dialogue = [
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
      "TCP is connection-oriented and guarantees ordered delivery. UDP is connectionless and fire-and-forget.",
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
  {
    id: "5",
    role: "system",
    content: "Context window: 4 messages retained.",
    time: "09:03",
  },
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Multi-turn dialogue with user, assistant, and system messages. */
export const Dialogue: Story = {
  args: { messages: dialogue },
};

/** Empty conversation state. */
export const Empty: Story = {
  args: { messages: [] },
};

/** Single message (just started). */
export const JustStarted: Story = {
  args: {
    messages: [{ id: "1", role: "user", content: "Hello!", time: "09:00" }],
  },
};
