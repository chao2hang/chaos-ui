import type { Meta, StoryObj } from "@storybook/react";
import { OaBridge } from "@/components/business/oa-bridge";

const meta = {
  title: "Business/Messaging/OaBridge",
  component: OaBridge,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { billId: "", billType: "" },
} satisfies Meta<typeof OaBridge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    billId: "BILL-001",
    billType: "expense",
  },
};

export const WithSubmit: Story = {
  args: {
    billId: "BILL-002",
    billType: "purchase",
    onSubmit: async (id) => { void id; },
  },
};
