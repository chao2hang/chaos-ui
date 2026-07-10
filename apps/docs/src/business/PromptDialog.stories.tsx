import type { Meta, StoryObj } from "@storybook/react";
import { PromptDialog } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof PromptDialog> = {
  title: "Business/PromptDialog",
  component: PromptDialog,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PromptDialog
      open={false}
      onOpenChange={() => {}}
      description={null}
      label={"示例"}
      placeholder={"请输入"}
      onConfirm={() => {}}
    />
  ),
};
