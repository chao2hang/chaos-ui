import type { Meta, StoryObj } from "@storybook/react";
import { MobileForm } from "@chaos_team/chaos-ui/mobile";

const meta: Meta<typeof MobileForm> = {
  title: "Business/MobileForm",
  component: MobileForm,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <MobileForm children={null} onSubmit={() => {}} />,
};
