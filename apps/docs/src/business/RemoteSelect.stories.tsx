import type { Meta, StoryObj } from "@storybook/react";
import { RemoteSelect } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof RemoteSelect> = {
  title: "Business/RemoteSelect",
  component: RemoteSelect,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
