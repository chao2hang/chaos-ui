import type { Meta, StoryObj } from "@storybook/react";
import { OrderLineEditor } from "@/components/business/order-line-editor";

const meta: Meta<typeof OrderLineEditor> = {
  title: "Business/OrderLineEditor",
  component: OrderLineEditor,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
