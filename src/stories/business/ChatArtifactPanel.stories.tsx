import type { Meta, StoryObj } from "@storybook/react";
import { ChatArtifactPanel } from "@/components/business/chat-artifact-panel";

const meta = {
  title: "Business/Chat/ChatArtifactPanel",
  component: ChatArtifactPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatArtifactPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** TypeScript source artifact. */
export const TypeScriptArtifact: Story = {
  args: {
    title: "user-service.ts",
    type: "typescript",
    content: `import { z } from "zod";

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(80),
});

export type User = z.infer<typeof UserSchema>;

export function parseUser(payload: unknown): User {
  return UserSchema.parse(payload);
}
`,
  },
};

/** Markdown artifact. */
export const MarkdownArtifact: Story = {
  args: {
    title: "release-notes.md",
    type: "markdown",
    content: `# v2.4.0 — 2026-07-06

## Features
- Chat artifact panel now supports copy + download.
- Voice messages render inline with playback controls.

## Fixes
- Stopped double-firing \`onSelect\` when the mention picker had a single user.
`,
  },
};

/** JSON artifact. */
export const JsonArtifact: Story = {
  args: {
    title: "config.json",
    type: "json",
    content: `{
  "name": "chaos-ui",
  "version": "2.4.0",
  "features": {
    "chatArtifact": true,
    "voiceMessage": true
  }
}`,
  },
};

/** Untitled artifact — falls back to default type/title. */
export const Untitled: Story = {
  args: {
    content: "Draft note — nothing has been saved yet.",
  },
};

/** Empty artifact (no content). */
export const Empty: Story = {
  args: {
    title: "empty.txt",
    type: "text",
    content: "",
  },
};
