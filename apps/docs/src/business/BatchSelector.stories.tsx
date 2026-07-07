import type { Meta, StoryObj } from "@storybook/react";
import { BatchSelector } from "@/components/business/batch-selector";

const meta = {
  title: "Business/BatchSelector",
  component: BatchSelector,
  tags: ["autodocs"],
} satisfies Meta<typeof BatchSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
