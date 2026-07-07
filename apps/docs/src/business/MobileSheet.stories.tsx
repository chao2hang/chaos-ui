import type { Meta, StoryObj } from "@storybook/react";
import { MobileSheet } from "@/components/business/mobile-sheet";

const meta = {
  title: "Business/MobileSheet",
  component: MobileSheet,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
