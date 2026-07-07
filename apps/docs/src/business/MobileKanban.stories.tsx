import type { Meta, StoryObj } from "@storybook/react";
import { MobileKanban } from "@/components/business/mobile-kanban";

const meta = {
  title: "Business/MobileKanban",
  component: MobileKanban,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileKanban>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
