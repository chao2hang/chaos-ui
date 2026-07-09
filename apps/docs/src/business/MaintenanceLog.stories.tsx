import type { Meta, StoryObj } from "@storybook/react";
import { MaintenanceLog } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof MaintenanceLog> = {
  title: "Business/MaintenanceLog",
  component: MaintenanceLog,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
