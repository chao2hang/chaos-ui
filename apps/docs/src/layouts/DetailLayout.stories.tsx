import type { Meta, StoryObj } from "@storybook/react";
import { DetailLayout } from "@chaos_team/chaos-ui/layout";

const meta: Meta<typeof DetailLayout> = {
  title: "Layouts/DetailLayout",
  component: DetailLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
