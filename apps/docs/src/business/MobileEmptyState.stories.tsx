import type { Meta, StoryObj } from "@storybook/react";
import { MobileEmptyState } from "@/components/business/mobile-empty-state";

const meta: Meta<typeof MobileEmptyState> = {
  title: "Business/MobileEmptyState",
  component: MobileEmptyState,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
