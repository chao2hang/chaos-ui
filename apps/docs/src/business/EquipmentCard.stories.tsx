import type { Meta, StoryObj } from "@storybook/react";
import { EquipmentCard } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof EquipmentCard> = {
  title: "Business/EquipmentCard",
  component: EquipmentCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <EquipmentCard
      name={"示例名称"}
      model={"示例"}
      metrics={[]}
      nextMaintenance={"示例"}
      location={"示例"}
      actions={[]}
      onClick={() => {}}
    />
  ),
};
