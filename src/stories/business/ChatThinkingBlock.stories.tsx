import type { Meta, StoryObj } from "@storybook/react";
import { ChatThinkingBlock } from "@/components/business/chat-thinking-block";

const meta = {
  title: "Business/Chat/ChatThinkingBlock",
  component: ChatThinkingBlock,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatThinkingBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Expanded thinking — user sees the full chain-of-thought. */
export const Expanded: Story = {
  args: {
    content:
      "The user asked about TCP vs UDP. Let me think about the key differences: connection orientation, delivery guarantees, ordering, and overhead. I should mention practical use cases for each.",
    duration: 1200,
    collapsed: false,
  },
};

/** Collapsed thinking (default for completed turns). */
export const Collapsed: Story = {
  args: {
    content:
      "Analyzing the request... Breaking it into sub-steps... Considering edge cases... Formulating response.",
    duration: 850,
    collapsed: true,
  },
};

/** Long reasoning chain. */
export const LongReasoning: Story = {
  args: {
    content:
      "Step 1: Parse the query. Step 2: Identify the core concept (Merkle trees). Step 3: Recall the definition — a binary hash tree. Step 4: Consider properties — integrity verification, O(log n) proof. Step 5: Recall real-world examples — Git, Bitcoin, IPFS. Step 6: Formulate a clear, concise explanation with an analogy.",
    duration: 3500,
    collapsed: false,
  },
};

/** No duration label (just thinking content). */
export const NoDuration: Story = {
  args: {
    content: "Quick reflection before answering...",
    collapsed: false,
  },
};
