import type { Meta, StoryObj } from "@storybook/react";
import { BatchSelector } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof BatchSelector> = {
  title: "Business/BatchSelector",
  component: BatchSelector,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
