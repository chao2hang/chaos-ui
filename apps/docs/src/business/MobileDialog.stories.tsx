import type { Meta, StoryObj } from "@storybook/react";
import { MobileDialog } from "@/components/business/mobile-dialog";

const meta: Meta<typeof MobileDialog> = {
  title: "Business/MobileDialog",
  component: MobileDialog,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
