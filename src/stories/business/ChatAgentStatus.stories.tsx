import type { Meta, StoryObj } from "@storybook/react";
import { ChatAgentStatus } from "@/components/business/chat-agent-status";

const meta = {
  title: "Business/Chat/ChatAgentStatus",
  component: ChatAgentStatus,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatAgentStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Idle — agent is ready and waiting. */
export const Idle: Story = { args: { status: "idle" } };

/** Thinking — animated indicator while reasoning. */
export const Thinking: Story = { args: { status: "thinking" } };

/** Acting — the agent is currently executing a tool call. */
export const Acting: Story = { args: { status: "acting" } };

/** Waiting — awaiting a user response or external event. */
export const Waiting: Story = { args: { status: "waiting" } };

/** Done — the task has completed successfully. */
export const Done: Story = { args: { status: "done" } };

/** Custom label overriding the default status text. */
export const CustomLabel: Story = {
  args: { status: "thinking", label: "Reasoning about the problem..." },
};
