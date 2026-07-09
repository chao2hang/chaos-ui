import type { Meta, StoryObj } from "@storybook/react";
import { MobilePullRefresh } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof MobilePullRefresh> = {
  title: "Components/MobilePullRefresh",
  component: MobilePullRefresh,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
