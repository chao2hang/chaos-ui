import type { Meta, StoryObj } from "@storybook/react";
import { ChatCommandMenu } from "@/components/business/chat-command-menu";

const meta = {
  title: "Business/Chat/ChatCommandMenu",
  component: ChatCommandMenu,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatCommandMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (id: string) => {
  void id;
};

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Common slash commands. */
export const SlashCommands: Story = {
  args: {
    commands: [
      {
        id: "clear",
        label: "/clear",
        description: "Clear the conversation history",
      },
      {
        id: "reset",
        label: "/reset",
        description: "Reset the conversation state",
      },
      {
        id: "summary",
        label: "/summary",
        description: "Generate a summary of this thread",
      },
      {
        id: "help",
        label: "/help",
        description: "Show all available commands",
      },
    ],
    onSelect: noop,
  },
};

/** Model-switching commands (no descriptions). */
export const SwitchCommands: Story = {
  args: {
    commands: [
      { id: "gpt4", label: "/model gpt-4o" },
      { id: "mini", label: "/model gpt-4o-mini" },
      { id: "o1", label: "/model o1-preview" },
    ],
    onSelect: noop,
  },
};

/** Longer command list with descriptions. */
export const RichCommands: Story = {
  args: {
    commands: [
      {
        id: "explain",
        label: "/explain",
        description: "Explain the last response in more detail",
      },
      {
        id: "simplify",
        label: "/simplify",
        description: "Simplify the last response",
      },
      {
        id: "translate",
        label: "/translate",
        description: "Translate to another language",
      },
      { id: "code", label: "/code", description: "Show related code examples" },
      {
        id: "cite",
        label: "/cite",
        description: "Cite the sources for the last claim",
      },
      {
        id: "regenerate",
        label: "/regenerate",
        description: "Regenerate the last response",
      },
    ],
    onSelect: noop,
  },
};

/** Empty menu (no commands matched). */
export const Empty: Story = {
  args: {
    commands: [],
    onSelect: noop,
  },
};
