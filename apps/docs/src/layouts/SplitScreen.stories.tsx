import type { Meta, StoryObj } from "@storybook/react";
import { SplitScreen } from "@chaos_team/chaos-ui/layout";

const meta: Meta<typeof SplitScreen> = {
  title: "Layouts/SplitScreen",
  component: SplitScreen,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
