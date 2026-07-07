import type { Meta, StoryObj } from "@storybook/react";
import { PrintButton } from "@/components/business/print-button";

const meta = {
  title: "Business/PrintButton",
  component: PrintButton,
  tags: ["autodocs"],
} satisfies Meta<typeof PrintButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
