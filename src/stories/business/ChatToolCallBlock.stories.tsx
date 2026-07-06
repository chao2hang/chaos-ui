import type { Meta, StoryObj } from "@storybook/react";
import { ChatToolCallBlock } from "@/components/business/chat-tool-call-block";

const meta = {
  title: "Business/Chat/ChatToolCallBlock",
  component: ChatToolCallBlock,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatToolCallBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Calling state — spinner indicates the tool is in flight. */
export const Calling: Story = {
  args: {
    toolName: "search_web",
    toolInput: { query: "merkle tree explanation", max_results: 5 },
    status: "calling",
  },
};

/** Successful tool call with structured output. */
export const Success: Story = {
  args: {
    toolName: "get_weather",
    toolInput: { city: "Shanghai", units: "metric" },
    toolOutput: {
      city: "Shanghai",
      temp: 28,
      condition: "sunny",
      humidity: 65,
    },
    status: "success",
  },
};

/** Failed tool call with error output. */
export const Error: Story = {
  args: {
    toolName: "execute_sql",
    toolInput: "SELECT * FROM users WHERE active = true",
    toolOutput: "Error: connection refused (ECONNREFUSED 127.0.0.1:5432)",
    status: "error",
  },
};

/** No output yet (calling, input only). */
export const InputOnly: Story = {
  args: {
    toolName: "read_file",
    toolInput: { path: "/app/config.json" },
    status: "calling",
  },
};

/** String input (not JSON object). */
export const StringInput: Story = {
  args: {
    toolName: "run_command",
    toolInput: "git status --short",
    toolOutput: " M styles.css\n?? new-feature.tsx",
    status: "success",
  },
};
