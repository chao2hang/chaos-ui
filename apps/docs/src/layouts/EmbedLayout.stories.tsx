import type { Meta, StoryObj } from "@storybook/react";
import { EmbedLayout } from "@chaos_team/chaos-ui/layout";

const meta: Meta<typeof EmbedLayout> = {
  title: "Layouts/EmbedLayout",
  component: EmbedLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
