import type { Meta, StoryObj } from "@storybook/react";
import { PreferencePanel } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof PreferencePanel> = {
  title: "Business/PreferencePanel",
  component: PreferencePanel,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
