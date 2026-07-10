import type { Meta, StoryObj } from "@storybook/react";
import { MobileTabs } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobileTabs> = {
  title: "Business/MobileTabs",
  component: MobileTabs,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <MobileTabs tabs={[]} defaultValue={"示例"} />,
};
