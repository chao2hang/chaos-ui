import type { Meta, StoryObj } from "@storybook/react";
import { MobileListItemSkeleton } from "@/components/business/mobile-skeleton";

const meta = {
  title: "Business/MobileSkeleton",
  component: MobileListItemSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
