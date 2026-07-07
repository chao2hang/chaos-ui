import type { Meta, StoryObj } from "@storybook/react";
import { EquipmentCard } from "@/components/business/equipment-card";

const meta = {
  title: "Business/EquipmentCard",
  component: EquipmentCard,
  tags: ["autodocs"],
} satisfies Meta<typeof EquipmentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
