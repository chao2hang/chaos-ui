import type { Meta, StoryObj } from "@storybook/react";
import { MobileBottomNav } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobileBottomNav> = {
  title: "Business/MobileBottomNav",
  component: MobileBottomNav,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <MobileBottomNav items={[]} onChange={() => {}} />,
};
