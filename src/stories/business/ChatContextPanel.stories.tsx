import type { Meta, StoryObj } from "@storybook/react";
import { ChatContextPanel } from "@/components/business/chat-context-panel";

const meta = {
  title: "Business/Chat/ChatContextPanel",
  component: ChatContextPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatContextPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Session context — model, token count, and session id. */
export const SessionContext: Story = {
  args: {
    context: [
      { label: "Model", value: "gpt-4o" },
      { label: "Tokens", value: "1,240 / 8,192" },
      { label: "Session", value: "sess_a3f9c2b7d1e8f4a2" },
      { label: "Started", value: "2026-07-06 10:40 UTC" },
    ],
  },
};

/** Document context — attached files. */
export const AttachedDocuments: Story = {
  args: {
    context: [
      { label: "Attached files", value: "3 files" },
      { label: "PRD.md", value: "12,450 tokens" },
      { label: "spec.yaml", value: "4,120 tokens" },
      { label: "context.log", value: "8,760 tokens" },
    ],
  },
};

/** User profile context. */
export const UserProfile: Story = {
  args: {
    context: [
      { label: "User", value: "Alice Chen" },
      { label: "Role", value: "Senior Engineer" },
      { label: "Team", value: "Platform Infrastructure" },
      { label: "Timezone", value: "Asia/Shanghai (UTC+8)" },
    ],
  },
};

/** Empty context. */
export const Empty: Story = {
  args: { context: [] },
};
