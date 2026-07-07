import type { Meta, StoryObj } from "@storybook/react";
import { MobileCard } from "@/components/business/mobile-card";

const meta = {
  title: "Business/MobileCard",
  component: MobileCard,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
