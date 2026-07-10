import type { Meta, StoryObj } from "@storybook/react";
import { ColorTag } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ColorTag> = {
  title: "Business/ColorTag",
  component: ColorTag,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ColorTag color={"#3b82f6"} children={"内容"} />,
};
