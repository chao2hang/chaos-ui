import type { Meta, StoryObj } from "@storybook/react";
import { BizStatusTag } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof BizStatusTag> = {
  title: "Business/BizStatusTag",
  component: BizStatusTag,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
