import type { Meta, StoryObj } from "@storybook/react";
import { MobileDialog } from "@/components/business/mobile-dialog";

const meta = {
  title: "Business/MobileDialog",
  component: MobileDialog,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
