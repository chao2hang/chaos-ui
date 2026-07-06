import type { Meta, StoryObj } from "@storybook/react";
import { PrintButton } from "@/components/business/print-button";

const meta = {
  title: "Business/Print/PrintButton",
  component: PrintButton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof PrintButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLabel: Story = {
  args: { label: "Print document" },
};

export const CustomHandler: Story = {
  args: {
    onPrint: () => {
      // Custom print handler — use window.print() or call an API
    },
  },
};
