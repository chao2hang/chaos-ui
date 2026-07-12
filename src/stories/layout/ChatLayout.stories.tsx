import type { Meta, StoryObj } from "@storybook/react";
import { ChatLayout } from "@/components/layout/chat-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const meta = {
  title: "Layouts/ChatLayout",
  component: ChatLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ChatLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Full chat layout — sidebar, messages, and input. */
export const FullChat: Story = {
  render: () => (
    // Host sets height; ChatLayout defaults to h-full (use className="h-svh" for viewport).
    <ChatLayout
      className="h-[480px]"
      sidebar={
        <div className="space-y-1 p-3">
          <p className="text-sm font-semibold">Conversations</p>
          {["Alice", "Bob", "Support team"].map((name, i) => (
            <div
              key={name}
              className={
                "rounded px-2 py-1.5 text-sm " +
                (i === 0
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground")
              }
            >
              {name}
            </div>
          ))}
        </div>
      }
      messagesArea={
        <div className="space-y-3 p-4">
          <div className="bg-muted max-w-md rounded-lg p-3 text-sm">
            Hi Alice! How can I help today?
          </div>
          <div className="bg-primary text-primary-foreground ml-auto max-w-md rounded-lg p-3 text-sm">
            I need to reset my password.
          </div>
        </div>
      }
      inputArea={
        <div className="flex items-center gap-2 border-t p-3">
          <Input placeholder="Type a message…" />
          <Button>Send</Button>
        </div>
      }
    />
  ),
};

/** Messages-only — no sidebar. */
export const MessagesOnly: Story = {
  render: () => (
    <ChatLayout
      className="h-[360px]"
      messagesArea={
        <div className="space-y-3 p-4">
          <div className="bg-muted max-w-md rounded-lg p-3 text-sm">
            Sidebar hidden — full-width thread.
          </div>
        </div>
      }
      inputArea={
        <div className="flex items-center gap-2 border-t p-3">
          <Input placeholder="Reply…" />
          <Button>Send</Button>
        </div>
      }
    />
  ),
};

/** Empty conversation state. */
export const EmptyConversation: Story = {
  render: () => (
    <ChatLayout
      className="h-[360px]"
      sidebar={
        <p className="text-muted-foreground p-3 text-sm">No conversations</p>
      }
      messagesArea={
        <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
          Select a conversation to start chatting
        </div>
      }
      inputArea={
        <div className="border-t p-3">
          <Input
            disabled
            placeholder="Disabled when no conversation is selected"
          />
        </div>
      }
    />
  ),
};
