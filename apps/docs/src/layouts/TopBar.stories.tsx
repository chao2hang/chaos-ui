import type { Meta, StoryObj } from "@storybook/react";
import { TopBar } from "@chaos_team/chaos-ui/layout";

const meta: Meta<typeof TopBar> = {
  title: "Layouts/TopBar",
  component: TopBar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
