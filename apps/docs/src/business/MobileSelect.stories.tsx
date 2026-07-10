import type { Meta, StoryObj } from "@storybook/react";
import { MobileSelect } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobileSelect> = {
  title: "Business/MobileSelect",
  component: MobileSelect,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MobileSelect
      options={[]}
      value={"示例内容"}
      onValueChange={() => {}}
      placeholder={"请输入"}
      disabled={false}
    />
  ),
};
