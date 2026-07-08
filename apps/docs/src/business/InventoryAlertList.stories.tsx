import type { Meta, StoryObj } from "@storybook/react";
import { InventoryAlertList } from "@/components/business/inventory-alert-list";

const meta: Meta<typeof InventoryAlertList> = {
  title: "Business/InventoryAlertList",
  component: InventoryAlertList,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
