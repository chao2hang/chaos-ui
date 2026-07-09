import type { Meta, StoryObj } from "@storybook/react";
import { OperationLog } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof OperationLog> = {
  title: "Business/OperationLog",
  component: OperationLog,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
