import type { Meta, StoryObj } from "@storybook/react";
import { AuthLayout } from "@chaos_team/chaos-ui/layout";

const meta: Meta<typeof AuthLayout> = {
  title: "Layouts/AuthLayout",
  component: AuthLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
