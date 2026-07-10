import type { Meta, StoryObj } from "@storybook/react";
import { BatchSelector } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof BatchSelector> = {
  title: "Business/BatchSelector",
  component: BatchSelector,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BatchSelector
      data={[
        { id: "1", name: "示例1" },
        { id: "2", name: "示例2" },
        { id: "3", name: "示例3" },
      ]}
      onChange={() => {}}
      trigger={null}
      onOpenChange={() => {}}
    />
  ),
};
