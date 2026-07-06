import type { Meta, StoryObj } from "@storybook/react";
import { ChatMessageInput } from "@/components/business/chat-message-input";

const meta = {
  title: "Business/Chat/ChatMessageInput",
  component: ChatMessageInput,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatMessageInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default input with a helpful placeholder. */
export const Default: Story = {
  args: {
    placeholder: "Type a message...",
  },
};

/** Pre-filled with text (controlled mode). */
export const Filled: Story = {
  args: {
    value: "Let me check the logs and get back to you.",
    placeholder: "Type a message...",
  },
};

/** Disabled state during assistant response. */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Waiting for response...",
    value: "",
  },
};

/** Input with a character limit counter. */
export const WithMaxLength: Story = {
  args: {
    maxLength: 200,
    placeholder: "Compose your message (max 200 chars)...",
    value: "Short and sweet.",
  },
};
