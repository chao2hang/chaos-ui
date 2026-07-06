import type { Meta, StoryObj } from "@storybook/react";
import { ChatMessageBubble } from "@/components/business/chat-message-bubble";

const meta = {
  title: "Business/Chat/ChatMessageBubble",
  component: ChatMessageBubble,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatMessageBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Assistant response with name + timestamp. */
export const AssistantMessage: Story = {
  args: {
    role: "assistant",
    content:
      "Sure! I can help you with that. Here's a brief overview of the topic you asked about.",
    name: "Assistant",
    time: "10:42",
  },
};

/** User message with delivery status. */
export const UserMessage: Story = {
  args: {
    role: "user",
    content: "Can you explain what a Merkle tree is?",
    name: "You",
    time: "10:41",
    status: "sent",
  },
};

/** System-level notice (centered, muted). */
export const SystemNotice: Story = {
  args: {
    role: "system",
    content: "Conversation started at 2026-07-06 10:40",
  },
};

/** Long-form assistant message showing bubble text wrapping. */
export const LongMessage: Story = {
  args: {
    role: "assistant",
    content:
      "A Merkle tree is a binary tree of hashes where each leaf represents a data block and each non-leaf node stores the hash of its two children. It allows efficient and secure verification of the contents of a large data structure — a client needs only the path of hashes from the leaf up to the root, and can prove membership in O(log n) space. Merkle trees are foundational in Git, Bitcoin, IPFS, and Certificate Transparency.",
    name: "Assistant",
    time: "10:43",
  },
};
