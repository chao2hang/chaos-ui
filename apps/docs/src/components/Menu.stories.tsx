import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
