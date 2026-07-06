import type { Meta, StoryObj } from "@storybook/react";
import { SwipeActions as MobileSwipeActions } from "@/components/mobile/mobile-swipe-actions";
import { MobileCard } from "@/components/mobile/mobile-card";
import { Trash2Icon, StarIcon } from "@/components/ui/icons";

const meta = {
  title: "Mobile/MobileSwipeActions",
  component: MobileSwipeActions,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MobileSwipeActions>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

export const Default: Story = {
  render: () => (
    <div className="max-w-sm space-y-3 p-4">
      <MobileSwipeActions
        leftAction={{
          label: "Delete",
          color: "#dc2626",
          icon: <Trash2Icon className="size-4" />,
          onClick: noop,
        }}
        rightAction={{
          label: "Favorite",
          color: "#16a34a",
          icon: <StarIcon className="size-4" />,
          onClick: noop,
        }}
      >
        <MobileCard title="Spring launch" description="Swipe left or right on touch devices">
          <p className="text-sm text-muted-foreground">
            Review the latest campaign update.
          </p>
        </MobileCard>
      </MobileSwipeActions>
    </div>
  ),
};

export const LeftOnly: Story = {
  render: () => (
    <div className="max-w-sm space-y-3 p-4">
      <MobileSwipeActions
        leftAction={{
          label: "Archive",
          color: "#64748b",
          icon: <Trash2Icon className="size-4" />,
          onClick: noop,
        }}
      >
        <MobileCard title="Draft" description="Swipe left to archive">
          <p className="text-sm text-muted-foreground">Archived items move to history.</p>
        </MobileCard>
      </MobileSwipeActions>
    </div>
  ),
};

export const RightOnly: Story = {
  render: () => (
    <div className="max-w-sm space-y-3 p-4">
      <MobileSwipeActions
        rightAction={{
          label: "Pin",
          color: "#2563eb",
          icon: <StarIcon className="size-4" />,
          onClick: noop,
        }}
      >
        <MobileCard title="Pinned item" description="Swipe right to pin">
          <p className="text-sm text-muted-foreground">Pinned items stay on top.</p>
        </MobileCard>
      </MobileSwipeActions>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="max-w-sm space-y-3 p-4">
      <MobileSwipeActions
        disabled
        leftAction={{
          label: "Delete",
          color: "#dc2626",
          icon: <Trash2Icon className="size-4" />,
          onClick: noop,
        }}
      >
        <MobileCard title="Locked" description="Swiping is disabled">
          <p className="text-sm text-muted-foreground">No swipe gestures available.</p>
        </MobileCard>
      </MobileSwipeActions>
    </div>
  ),
};
