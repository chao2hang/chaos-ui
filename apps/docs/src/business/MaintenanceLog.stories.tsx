import type { Meta, StoryObj } from "@storybook/react";
import { MaintenanceLog } from "@/components/business/maintenance-log";

const meta = {
  title: "Business/MaintenanceLog",
  component: MaintenanceLog,
  tags: ["autodocs"],
} satisfies Meta<typeof MaintenanceLog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
