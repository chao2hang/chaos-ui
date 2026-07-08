import type { Meta, StoryObj } from "@storybook/react";
import { Fab } from "@/components/business/fab";

const meta: Meta<typeof Fab> = {
  title: "Business/Fab",
  component: Fab,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
