import type { Meta, StoryObj } from "@storybook/react";
import { PromptDialog } from "@/components/business/prompt-dialog";

const meta = {
  title: "Business/PromptDialog",
  component: PromptDialog,
  tags: ["autodocs"],
} satisfies Meta<typeof PromptDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
