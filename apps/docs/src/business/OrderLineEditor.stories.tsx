import type { Meta, StoryObj } from "@storybook/react";
import { OrderLineEditor } from "@/components/business/order-line-editor";

const meta = {
  title: "Business/OrderLineEditor",
  component: OrderLineEditor,
  tags: ["autodocs"],
} satisfies Meta<typeof OrderLineEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
