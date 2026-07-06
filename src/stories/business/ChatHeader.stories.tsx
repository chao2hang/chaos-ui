import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { ChatHeader } from "@/components/business/chat-header";

const meta = {
  title: "Business/Chat/ChatHeader",
  component: ChatHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Full header with title, subtitle, status badge, and action buttons. */
export const FullHeader: Story = {
  args: {
    title: "TCP vs UDP explained",
    subtitle: "gpt-4o",
    status: "Online",
    actions: (
      <>
        <Button size="sm" variant="outline">
          Share
        </Button>
        <Button size="sm" variant="ghost">
          ⋯
        </Button>
      </>
    ),
  },
};

/** Title-only minimal header. */
export const TitleOnly: Story = {
  args: { title: "New Conversation" },
};

/** Title + subtitle, no status or actions. */
export const WithSubtitle: Story = {
  args: {
    title: "React 19 migration",
    subtitle: "claude-3.5-sonnet",
  },
};

/** Status badge only (no subtitle). */
export const WithStatus: Story = {
  args: {
    title: "Docker networking guide",
    status: "Offline",
  },
};

/** Header with a single action button. */
export const SingleAction: Story = {
  args: {
    title: "Quick question about SSH",
    subtitle: "3 messages",
    actions: (
      <Button size="sm" variant="outline">
        Pin
      </Button>
    ),
  },
};
