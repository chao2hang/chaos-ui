import type { Meta, StoryObj } from "@storybook/react";
import { MobileListItemSkeleton } from "@/components/business/mobile-skeleton";

const meta: Meta<typeof MobileListItemSkeleton> = {
  title: "Business/MobileSkeleton",
  component: MobileListItemSkeleton,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
