import type { Meta, StoryObj } from "@storybook/react";
import {
  MaintenanceLog,
  type MaintenanceEntry,
} from "@/components/business/maintenance-log";

const entries: MaintenanceEntry[] = [
  {
    id: "m-1",
    date: "2025-01-15",
    type: "preventive",
    title: "Scheduled oil change",
    description:
      "Replaced hydraulic oil and filters on CNC Mill #3. Checked all hose connections.",
    technician: "Zhang Wei",
    parts: ["Hydraulic filter HF-220", "ISO VG 46 Oil (20L)"],
    duration: "2.5 hours",
    status: "completed",
    cost: 1200,
  },
  {
    id: "m-2",
    date: "2025-01-18",
    type: "corrective",
    title: "Spindle bearing replacement",
    description:
      "Replaced worn spindle bearing after vibration alarm triggered. Re-calibrated spindle runout.",
    technician: "Li Ming",
    parts: ["SKF 7014 Bearing", "Spindle seal kit"],
    duration: "6 hours",
    status: "completed",
    cost: 4800,
  },
  {
    id: "m-3",
    date: "2025-01-20",
    type: "inspection",
    title: "Quarterly safety inspection",
    description:
      "Inspected all safety guards, e-stop buttons, and light curtains per safety checklist.",
    technician: "Wang Fang",
    duration: "1 hour",
    status: "in-progress",
  },
  {
    id: "m-4",
    date: "2025-02-01",
    type: "calibration",
    title: "Laser measurement system calibration",
    description:
      "Annual calibration of laser measurement system to ensure machining accuracy within \u00b10.005mm.",
    status: "scheduled",
  },
  {
    id: "m-5",
    date: "2025-02-10",
    type: "emergency",
    title: "Motor burnout emergency repair",
    description:
      "Main drive motor burned out during production. Emergency replacement ordered and installed.",
    technician: "Chen Jie",
    parts: ["Siemens 1PH8 Motor", "Drive belt set"],
    duration: "8 hours",
    status: "completed",
    cost: 28000,
  },
  {
    id: "m-6",
    date: "2025-02-15",
    type: "preventive",
    title: "Belt tension adjustment",
    technician: "Chen Jie",
    duration: "45 minutes",
    status: "scheduled",
  },
];

const meta = {
  title: "Business/MaintenanceLog",
  component: MaintenanceLog,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof MaintenanceLog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { entries },
};

export const WithFilter: Story = {
  args: {
    entries,
    showFilter: true,
  },
};

export const WithTitle: Story = {
  args: {
    entries,
    title: "CNC Mill #3 - Maintenance History",
    showFilter: true,
  },
};

export const EmptyState: Story = {
  args: {
    entries: [],
    showFilter: true,
    emptyText: "No maintenance records found.",
  },
};

export const DarkMode: Story = {
  args: {
    entries,
    showFilter: true,
  },
  parameters: {
    themes: { themeOverride: "dark" },
  },
};
