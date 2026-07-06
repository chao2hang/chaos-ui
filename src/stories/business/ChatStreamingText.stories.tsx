import type { Meta, StoryObj } from "@storybook/react";
import { ChatStreamingText } from "@/components/business/chat-streaming-text";

const meta = {
  title: "Business/Chat/ChatStreamingText",
  component: ChatStreamingText,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatStreamingText>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Streaming in progress — text reveals character by character. */
export const Streaming: Story = {
  args: {
    chunks: ["The quick brown fox ", "jumps over ", "the lazy dog."],
    isStreaming: true,
    speed: 30,
  },
};

/** Fully revealed (streaming complete). */
export const Complete: Story = {
  args: {
    chunks: ["The quick brown fox jumps over the lazy dog."],
    isStreaming: false,
  },
};

/** Faster streaming speed for snappy UX. */
export const FastStream: Story = {
  args: {
    chunks: ["Loading... ", "Done! ", "All systems operational."],
    isStreaming: true,
    speed: 10,
  },
};

/** Slow dramatic reveal for long-form content. */
export const SlowStream: Story = {
  args: {
    chunks: ["In a world ", "where data flows ", "like rivers..."],
    isStreaming: true,
    speed: 80,
  },
};
