import type { Meta, StoryObj } from "@storybook/react";
import { EmbedLayout } from "@/components/layout/embed-layout";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Layouts/EmbedLayout",
  component: EmbedLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof EmbedLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Embeddable widget with a title bar and scrollable body. */
export const WithHeader: Story = {
  render: () => (
    <EmbedLayout
      className="h-[360px] max-w-2xl rounded-lg border"
      header={
        <div className="flex w-full items-center justify-between px-4 py-2">
          <span className="text-sm font-semibold">
            Order #A2B3 — embeddable
          </span>
          <Button size="sm" variant="outline">
            Open in app
          </Button>
        </div>
      }
    >
      <div className="space-y-2 p-4 text-sm">
        <p>
          Status: <span className="font-medium">Shipped</span>
        </p>
        <p>Tracking: 1Z999AA10123456784</p>
        <p>ETA: 2026-07-08</p>
        <p className="text-muted-foreground">
          This layout is designed to be dropped into third-party pages; the body
          scrolls independently of the host page.
        </p>
      </div>
    </EmbedLayout>
  ),
};

/** Headerless — body only, ideal for bare embeds. */
export const Headerless: Story = {
  render: () => (
    <EmbedLayout className="h-[240px] max-w-2xl rounded-lg border">
      <div className="p-4 text-sm">
        A minimal embed surface — no header chrome, just the content area.
      </div>
    </EmbedLayout>
  ),
};

/** Tall content area demonstrating the scrollable body. */
export const ScrollableBody: Story = {
  render: () => (
    <EmbedLayout
      className="h-[300px] max-w-2xl rounded-lg border"
      header={
        <span className="px-4 py-2 text-sm font-semibold">
          Notifications (scroll me)
        </span>
      }
    >
      <ul className="divide-y">
        {Array.from({ length: 30 }, (_, i) => (
          <li key={i} className="px-4 py-2 text-sm">
            Notification #{i + 1}: new event at {String(i + 8).padStart(2, "0")}
            :00
          </li>
        ))}
      </ul>
    </EmbedLayout>
  ),
};
