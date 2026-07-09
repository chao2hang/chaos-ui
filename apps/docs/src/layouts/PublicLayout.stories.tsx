import type { Meta, StoryObj } from "@storybook/react";
import { PublicLayout } from "@chaos_team/chaos-ui/layout";

const meta: Meta<typeof PublicLayout> = {
  title: "Layouts/PublicLayout",
  component: PublicLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
