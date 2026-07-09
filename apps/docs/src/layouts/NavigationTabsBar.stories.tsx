import type { Meta, StoryObj } from "@storybook/react";
import { NavigationTabsBar } from "@chaos_team/chaos-ui/layout";

const meta: Meta<typeof NavigationTabsBar> = {
  title: "Layouts/NavigationTabsBar",
  component: NavigationTabsBar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
