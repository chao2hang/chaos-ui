import type { Meta, StoryObj } from "@storybook/react";
import { FieldMask } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof FieldMask> = {
  title: "Business/FieldMask",
  component: FieldMask,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FieldMask value={"示例内容"} />,
};
