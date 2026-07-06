import type { Meta, StoryObj } from "@storybook/react";
import { ChatInput } from "@/components/ui/chat-input";

const meta = {
  title: "Components/ChatInput",
  component: ChatInput,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const noopString = (value: string) => {
  void value;
};
const noop = () => {};

export const Default: Story = {
  args: {
    placeholder: "Type a message…",
    onChange: noopString,
    onSend: noop,
  },
};

export const WithValue: Story = {
  args: {
    value: "Hello, Chaos assistant!",
    placeholder: "Type a message…",
    onChange: noopString,
    onSend: noop,
  },
};

export const Disabled: Story = {
  args: {
    value: "Model is unavailable",
    placeholder: "Type a message…",
    disabled: true,
    onChange: noopString,
    onSend: noop,
  },
};
