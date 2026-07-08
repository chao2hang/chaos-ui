import type { Meta, StoryObj } from "@storybook/react";
import { MobileCard } from "@/components/business/mobile-card";

const meta: Meta<typeof MobileCard> = {
  title: "Business/MobileCard",
  component: MobileCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
