import type { Meta, StoryObj } from "@storybook/react";
import { GlobalLoading } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof GlobalLoading> = {
  title: "Business/GlobalLoading",
  component: GlobalLoading,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
