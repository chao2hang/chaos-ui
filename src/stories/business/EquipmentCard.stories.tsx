import type { Meta, StoryObj } from "@storybook/react";
import {
  EquipmentCard,
  type EquipmentStatus,
} from "@/components/business/equipment-card";

const meta = {
  title: "Business/EquipmentCard",
  component: EquipmentCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof EquipmentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "CNC Mill #3",
    model: "Haas VF-2SS",
    status: "running",
    metrics: [
      { label: "OEE", value: "92%", trend: "up" },
      { label: "Output", value: 1240, unit: "pcs" },
      { label: "Temperature", value: 42.5, unit: "\u00b0C", trend: "flat" },
      { label: "Runtime", value: "7.5h" },
    ],
    location: "Building A, Line 2",
    nextMaintenance: "2025-02-15",
  },
};

export const AllStatuses: Story = {
  args: {},
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {(["running", "idle", "maintenance", "fault", "offline"] as EquipmentStatus[]).map(
        (status) => (
          <EquipmentCard
            key={status}
            name={`Equipment ${status}`}
            model="Model X-100"
            status={status}
            metrics={[
              { label: "OEE", value: status === "running" ? "92%" : "0%" },
              { label: "Runtime", value: status === "running" ? "7.5h" : "0h" },
            ]}
          />
        ),
      )}
    </div>
  ),
};

export const WithActions: Story = {
  args: {
    name: "AGV #12",
    model: "KUKA KMR iiwa",
    status: "idle",
    metrics: [
      { label: "Battery", value: "78%" },
      { label: "Tasks today", value: 42, unit: "trips" },
    ],
    location: "Warehouse Zone",
    actions: [
      { label: "Start", onClick: () => console.log("Start AGV") },
      { label: "Details", onClick: () => console.log("View details") },
      { label: "Maintenance", onClick: () => console.log("Schedule maintenance") },
    ],
  },
};

export const DarkMode: Story = {
  args: {
    name: "CNC Lathe #5",
    model: "DMG MORI NLX 2500",
    status: "fault",
    metrics: [
      { label: "OEE", value: "0%", trend: "down" },
      { label: "Error code", value: "E-042" },
      { label: "Temperature", value: 87.2, unit: "\u00b0C", trend: "up" },
      { label: "Runtime", value: "0h" },
    ],
    location: "Building A, Precision Machining",
    nextMaintenance: "2025-01-20 (urgent)",
    actions: [
      { label: "Report", onClick: () => console.log("Report fault") },
      { label: "Logs", onClick: () => console.log("View logs") },
    ],
  },
  parameters: {
    themes: { themeOverride: "dark" },
  },
};
