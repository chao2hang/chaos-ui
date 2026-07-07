import type { Meta, StoryObj } from "@storybook/react";
import { InventoryAlertList } from "@/components/business/inventory-alert-list";

const meta = {
  title: "Business/InventoryAlertList",
  component: InventoryAlertList,
  tags: ["autodocs"],
} satisfies Meta<typeof InventoryAlertList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
