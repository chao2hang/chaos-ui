import type { Meta, StoryObj } from "@storybook/react";
import { OeeDashboard } from "@/components/business/oee-dashboard";
import type { OeeEquipment, OeeLoss } from "@/components/business/oee-dashboard";

const meta = {
  title: "Business/OeeDashboard",
  component: OeeDashboard,
  tags: ["autodocs"],
} satisfies Meta<typeof OeeDashboard>;
export default meta;
type Story = StoryObj<typeof meta>;

const equipment: OeeEquipment = {
  id: "eq1",
  name: "CNC Machining Center #3",
  availability: 88.5,
  performance: 95.2,
  quality: 98.7,
  plannedTime: 480,
  downtime: 55,
  totalUnits: 1200,
  defectUnits: 15,
  idealCycleTime: 22,
  runTime: 425,
};

const losses: OeeLoss[] = [
  { label: "Tool Change", minutes: 20, category: "availability" },
  { label: "Unplanned Breakdown", minutes: 25, category: "availability" },
  { label: "Material Shortage", minutes: 10, category: "availability" },
  { label: "Minor Stops", minutes: 12, category: "performance" },
  { label: "Speed Loss", minutes: 15, category: "performance" },
  { label: "Startup Loss", minutes: 8, category: "performance" },
  { label: "Production Rejects", minutes: 8, category: "quality" },
  { label: "Rework", minutes: 7, category: "quality" },
];

export const Default: Story = {
  args: { equipment, losses, title: "OEE Dashboard", targetOee: 85 },
};

export const HighPerformance: Story = {
  args: {
    equipment: {
      ...equipment,
      name: "Injection Molding Line A",
      availability: 96.2,
      performance: 98.5,
      quality: 99.5,
      plannedTime: 960,
      downtime: 36,
      totalUnits: 4800,
      defectUnits: 24,
      runTime: 924,
    },
    losses: losses.slice(0, 4),
    title: "Best-in-Class Equipment",
    targetOee: 85,
  },
};

export const LowOee: Story = {
  args: {
    equipment: {
      ...equipment,
      name: "Legacy Press #7",
      availability: 62.3,
      performance: 71.8,
      quality: 89.2,
      plannedTime: 480,
      downtime: 181,
      totalUnits: 580,
      defectUnits: 63,
      runTime: 299,
    },
    losses: [
      { label: "Major Breakdown", minutes: 120, category: "availability" },
      { label: "Tool Wear", minutes: 40, category: "availability" },
      { label: "Speed Loss", minutes: 55, category: "performance" },
      { label: "Idling", minutes: 30, category: "performance" },
      { label: "High Rejects", minutes: 35, category: "quality" },
      { label: "Rework", minutes: 25, category: "quality" },
    ],
    title: "Needs Attention",
    targetOee: 85,
  },
};

export const NoLosses: Story = {
  args: { equipment, losses: [], title: "Quick View" },
};
