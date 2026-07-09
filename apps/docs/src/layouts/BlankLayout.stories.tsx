import type { Meta, StoryObj } from "@storybook/react";
import { BlankLayout } from "@chaos_team/chaos-ui/layout";

const meta: Meta<typeof BlankLayout> = {
  title: "Layouts/BlankLayout",
  component: BlankLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
