import type { Meta, StoryObj } from "@storybook/react";
import { MobileAuthLayout } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobileAuthLayout> = {
  title: "Business/MobileAuthLayout",
  component: MobileAuthLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <MobileAuthLayout children={null} />,
};
