import type { Meta, StoryObj } from "@storybook/react";
import { WithPermission } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof WithPermission> = {
  title: "Components/WithPermission",
  component: WithPermission,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
