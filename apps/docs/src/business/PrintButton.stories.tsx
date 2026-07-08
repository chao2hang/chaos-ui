import type { Meta, StoryObj } from "@storybook/react";
import { PrintButton } from "@/components/business/print-button";

const meta: Meta<typeof PrintButton> = {
  title: "Business/PrintButton",
  component: PrintButton,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
