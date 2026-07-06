import type { Meta, StoryObj } from "@storybook/react";
import { ChatVoiceMessage } from "@/components/business/chat-voice-message";

const meta = {
  title: "Business/Chat/ChatVoiceMessage",
  component: ChatVoiceMessage,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatVoiceMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Typical short voice note. */
export const Default: Story = {
  args: { duration: 8 },
};

/** Sub-minute voice message — shows `m:ss` formatting at the upper bound. */
export const SubMinute: Story = {
  args: { duration: 54 },
};

/** Just over a minute — exercises the `m:ss` formatter with `m >= 1`. */
export const OverAMinute: Story = {
  args: { duration: 87 },
};

/** Short blip — under five seconds. */
export const Blip: Story = {
  args: { duration: 3 },
};

/** Longer dictation (~5 minutes). */
export const LongDictation: Story = {
  args: { duration: 312 },
};
