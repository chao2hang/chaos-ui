import type { Meta, StoryObj } from "@storybook/react";
import { OrderLineEditor } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof OrderLineEditor> = {
  title: "Business/OrderLineEditor",
  component: OrderLineEditor,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
