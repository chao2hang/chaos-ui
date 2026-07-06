import type { Meta, StoryObj } from "@storybook/react";
import { ChatMessageGroup } from "@/components/business/chat-message-group";

const meta = {
  title: "Business/Chat/ChatMessageGroup",
  component: ChatMessageGroup,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatMessageGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Sender sends three consecutive messages within a short window. */
export const Consecutive: Story = {
  args: {
    sender: "Alice Chen",
    messages: [
      { id: "1", content: "Hey, did you catch the release notes for v2?" },
      { id: "2", content: "There's a breaking change on the auth API." },
      { id: "3", content: "We should sync before Friday.", time: "14:22" },
    ],
  },
};

/** Single message from the group (still uses group presentation). */
export const SingleMessage: Story = {
  args: {
    sender: "Bob Kim",
    messages: [
      { id: "1", content: "Sounds good, I'll take a look.", time: "14:25" },
    ],
  },
};

/** Long thread with many messages. */
export const LongThread: Story = {
  args: {
    sender: "Carol Wang",
    messages: [
      { id: "1", content: "Actually, one more thing —" },
      { id: "2", content: "The migration script needs a dry-run flag." },
      { id: "3", content: "And we should add rollback logging." },
      { id: "4", content: "I'll open a PR tomorrow." },
      {
        id: "5",
        content: "Ping me when you're free to review.",
        time: "16:07",
      },
    ],
  },
};
