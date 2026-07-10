import type { Meta, StoryObj } from "@storybook/react";
import { InventoryAlertList } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof InventoryAlertList> = {
  title: "Business/InventoryAlertList",
  component: InventoryAlertList,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <InventoryAlertList
      items={[]}
      onTabChange={() => {}}
      onItemClick={() => {}}
      onReorder={() => {}}
    />
  ),
};
