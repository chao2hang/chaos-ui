import type { Meta, StoryObj } from "@storybook/react";
import { ChatFeedback } from "@/components/business/chat-feedback";

const meta = {
  title: "Business/Chat/ChatFeedback",
  component: ChatFeedback,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatFeedback>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};
const noopString = (t: string) => {
  void t;
};

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** All feedback handlers wired — like, dislike, and comment. */
export const AllHandlers: Story = {
  args: {
    onLike: noop,
    onDislike: noop,
    onComment: noopString,
  },
};

/** Like/dislike only, no comment. */
export const VoteOnly: Story = {
  args: {
    onLike: noop,
    onDislike: noop,
  },
};

/** Comment-only feedback (for detailed responses). */
export const CommentOnly: Story = {
  args: {
    onComment: noopString,
  },
};

/** Read-only view (no handlers wired — buttons remain but do nothing). */
export const ReadOnly: Story = {
  args: {},
};
