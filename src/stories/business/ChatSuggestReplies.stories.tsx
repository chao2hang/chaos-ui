import type { Meta, StoryObj } from "@storybook/react";
import { ChatSuggestReplies } from "@/components/business/chat-suggest-replies";

const meta = {
  title: "Business/Chat/ChatSuggestReplies",
  component: ChatSuggestReplies,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatSuggestReplies>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (s: string) => {
  void s;
};

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Three quick-reply chips for common follow-ups. */
export const QuickReplies: Story = {
  args: {
    suggestions: ["Tell me more", "Show an example", "Explain differently"],
    onSelect: noop,
  },
};

/** Yes/no confirmation flow. */
export const YesNo: Story = {
  args: {
    suggestions: ["Yes, proceed", "No, cancel"],
    onSelect: noop,
  },
};

/** Longer suggestion list — up to 6 chips. */
export const ManySuggestions: Story = {
  args: {
    suggestions: [
      "Summarize this",
      "Translate to English",
      "Simplify",
      "Add examples",
      "Change tone",
      "Regenerate",
    ],
    onSelect: noop,
  },
};

/** Empty state (renders nothing visible). */
export const Empty: Story = {
  args: {
    suggestions: [],
    onSelect: noop,
  },
};
