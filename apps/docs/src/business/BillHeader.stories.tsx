import type { Meta, StoryObj } from "@storybook/react";
import { BillHeader } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof BillHeader> = {
  title: "Business/BillHeader",
  component: BillHeader,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <BillHeader fields={[]} extra={null} />,
};
