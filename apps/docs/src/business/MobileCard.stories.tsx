import type { Meta, StoryObj } from "@storybook/react";
import { MobileCard } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobileCard> = {
  title: "Business/MobileCard",
  component: MobileCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MobileCard
      title={"示例"}
      description={"这是一个示例描述"}
      children={null}
      actions={null}
    />
  ),
};
