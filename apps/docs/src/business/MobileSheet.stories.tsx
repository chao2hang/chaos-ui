import type { Meta, StoryObj } from "@storybook/react";
import { MobileSheet } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobileSheet> = {
  title: "Business/MobileSheet",
  component: MobileSheet,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MobileSheet
      children={null}
      title={"示例"}
      description={"这是一个示例描述"}
      trigger={null}
      actions={null}
      open={false}
      onOpenChange={() => {}}
    />
  ),
};
