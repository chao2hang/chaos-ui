import type { Meta, StoryObj } from "@storybook/react";
import { PrintLayout } from "@chaos_team/chaos-ui/layout";

const meta: Meta<typeof PrintLayout> = {
  title: "Layouts/PrintLayout",
  component: PrintLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
