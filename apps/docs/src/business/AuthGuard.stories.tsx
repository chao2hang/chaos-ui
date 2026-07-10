import type { Meta, StoryObj } from "@storybook/react";
import { AuthGuard } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof AuthGuard> = {
  title: "Business/AuthGuard",
  component: AuthGuard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AuthGuard permission={"示例"} check={() => {}} children={null} />
  ),
};
