import type { Meta, StoryObj } from "@storybook/react";
import { ChatMessageActions } from "@/components/business/chat-message-actions";

const meta = {
  title: "Business/Chat/ChatMessageActions",
  component: ChatMessageActions,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatMessageActions>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Full toolbar with all four actions. */
export const AllActions: Story = {
  args: {
    onReply: noop,
    onCopy: noop,
    onRegenerate: noop,
    onDelete: noop,
  },
};

/** Assistant response — reply, copy, regenerate (no delete). */
export const AssistantActions: Story = {
  args: {
    onReply: noop,
    onCopy: noop,
    onRegenerate: noop,
  },
};

/** User message — only reply, copy, and delete. */
export const UserActions: Story = {
  args: {
    onReply: noop,
    onCopy: noop,
    onDelete: noop,
  },
};

/** Copy-only (read-only history view). */
export const CopyOnly: Story = {
  args: {
    onCopy: noop,
  },
};
