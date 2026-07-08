import type { Meta, StoryObj } from "@storybook/react";
import { PromptDialog } from "@/components/business/prompt-dialog";

const meta: Meta<typeof PromptDialog> = {
  title: "Business/PromptDialog",
  component: PromptDialog,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
