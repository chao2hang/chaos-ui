import type { Meta, StoryObj } from "@storybook/react";
import {
  MobileListItemSkeleton,
  MobileCardSkeleton,
  MobileDetailSkeleton,
} from "@/components/mobile/mobile-skeleton";

const meta = {
  title: "Mobile/MobileSkeleton",
  component: MobileListItemSkeleton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MobileListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListItem: Story = {
  render: () => (
    <div className="max-w-sm divide-y">
      <MobileListItemSkeleton />
      <MobileListItemSkeleton />
      <MobileListItemSkeleton />
    </div>
  ),
};

export const Card: Story = {
  render: () => (
    <div className="grid max-w-md grid-cols-2 gap-4">
      <MobileCardSkeleton />
      <MobileCardSkeleton />
    </div>
  ),
};

export const Detail: Story = {
  render: () => (
    <div className="max-w-md">
      <MobileDetailSkeleton />
    </div>
  ),
};

export const Stacked: Story = {
  render: () => (
    <div className="max-w-md space-y-6">
      <MobileDetailSkeleton />
      <div className="grid grid-cols-2 gap-4">
        <MobileCardSkeleton />
        <MobileCardSkeleton />
      </div>
      <div className="divide-y">
        <MobileListItemSkeleton />
        <MobileListItemSkeleton />
      </div>
    </div>
  ),
};
