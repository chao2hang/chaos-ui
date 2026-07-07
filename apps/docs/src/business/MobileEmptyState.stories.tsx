import type { Meta, StoryObj } from "@storybook/react";
import { MobileEmptyState } from "@/components/business/mobile-empty-state";

const meta = {
  title: "Business/MobileEmptyState",
  component: MobileEmptyState,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
