import type { Meta, StoryObj } from "@storybook/react";
import { BatchSelector } from "@/components/business/batch-selector";

const meta: Meta<typeof BatchSelector> = {
  title: "Business/BatchSelector",
  component: BatchSelector,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
