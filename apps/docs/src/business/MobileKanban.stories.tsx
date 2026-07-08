import type { Meta, StoryObj } from "@storybook/react";
import { MobileKanban } from "@/components/business/mobile-kanban";

const meta: Meta<typeof MobileKanban> = {
  title: "Business/MobileKanban",
  component: MobileKanban,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
