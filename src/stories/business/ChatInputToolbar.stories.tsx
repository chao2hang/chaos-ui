import type { Meta, StoryObj } from "@storybook/react";
import { PaperclipIcon, ImageIcon, MicIcon, CodeIcon } from "lucide-react";
import { ChatInputToolbar } from "@/components/business/chat-input-toolbar";

const meta = {
  title: "Business/Chat/ChatInputToolbar",
  component: ChatInputToolbar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatInputToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (id: string) => {
  void id;
};

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Four common input tools. */
export const Default: Story = {
  args: {
    tools: [
      {
        id: "attach",
        icon: <PaperclipIcon className="size-4" />,
        label: "Attach",
      },
      { id: "image", icon: <ImageIcon className="size-4" />, label: "Image" },
      { id: "mic", icon: <MicIcon className="size-4" />, label: "Voice" },
      { id: "code", icon: <CodeIcon className="size-4" />, label: "Code" },
    ],
    onToolClick: noop,
  },
};

/** Two tools only. */
export const Minimal: Story = {
  args: {
    tools: [
      {
        id: "attach",
        icon: <PaperclipIcon className="size-4" />,
        label: "Attach",
      },
      { id: "image", icon: <ImageIcon className="size-4" />, label: "Image" },
    ],
    onToolClick: noop,
  },
};

/** Tools without icons — label-only buttons. */
export const TextOnly: Story = {
  args: {
    tools: [
      { id: "clear", label: "Clear" },
      { id: "reset", label: "Reset" },
      { id: "summarize", label: "Summarize" },
    ],
    onToolClick: noop,
  },
};

/** Single tool. */
export const SingleTool: Story = {
  args: {
    tools: [
      { id: "mic", icon: <MicIcon className="size-4" />, label: "Voice" },
    ],
    onToolClick: noop,
  },
};
