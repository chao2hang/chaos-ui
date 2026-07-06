import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MobileSwipeAction } from "@/components/ui/mobile-swipe-action";

const meta = {
  title: "Components/MobileSwipeAction",
  component: MobileSwipeAction,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MobileSwipeAction>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

const Row = (children: React.ReactNode, extra?: Record<string, unknown>) => (
  <div
    className="bg-background flex items-center justify-between border-b px-4 py-4 text-sm"
    {...extra}
  >
    {children}
  </div>
);

export const RightActionsOnly: Story = {
  render: () => (
    <div className="mx-auto max-w-sm overflow-hidden rounded-lg border">
      <MobileSwipeAction
        rightActions={[
          { key: "archive", label: "Archive", onClick: noop, color: "primary" },
          {
            key: "delete",
            label: "Delete",
            onClick: noop,
            color: "destructive",
          },
        ]}
      >
        {Row(<>Swipe left to reveal actions</>)}
      </MobileSwipeAction>
    </div>
  ),
};

export const LeftAndRight: Story = {
  render: () => (
    <div className="mx-auto max-w-sm overflow-hidden rounded-lg border">
      <MobileSwipeAction
        leftActions={[
          { key: "pin", label: "Pin", onClick: noop, color: "default" },
          { key: "mark", label: "Mark read", onClick: noop, color: "primary" },
        ]}
        rightActions={[
          {
            key: "delete",
            label: "Delete",
            onClick: noop,
            color: "destructive",
          },
        ]}
      >
        {Row(<>Swipe either direction</>)}
      </MobileSwipeAction>
    </div>
  ),
};

export const SingleDestructive: Story = {
  render: () => (
    <div className="mx-auto max-w-sm overflow-hidden rounded-lg border">
      <MobileSwipeAction
        rightActions={[
          {
            key: "delete",
            label: "Delete",
            onClick: noop,
            color: "destructive",
          },
        ]}
      >
        {Row(<>Swipe to delete</>)}
      </MobileSwipeAction>
    </div>
  ),
};

export const NarrowActions: Story = {
  render: () => (
    <div className="mx-auto max-w-sm overflow-hidden rounded-lg border">
      <MobileSwipeAction
        actionWidth={64}
        rightActions={[
          { key: "edit", label: "Edit", onClick: noop, color: "primary" },
          { key: "delete", label: "Del", onClick: noop, color: "destructive" },
        ]}
      >
        {Row(<>Narrower action buttons</>)}
      </MobileSwipeAction>
    </div>
  ),
};
