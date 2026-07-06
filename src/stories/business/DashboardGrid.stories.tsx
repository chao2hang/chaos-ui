import type { Meta, StoryObj } from "@storybook/react";
import { DashboardGrid } from "@/components/business/dashboard-grid";

const stats = [
  { label: "Revenue", value: 45231, delta: 12.5, trend: "up" as const },
  { label: "Users", value: 2350, delta: 8.3, trend: "up" as const },
  { label: "Churn", value: 3.2, delta: -1.2, trend: "down" as const },
];

const meta = { title: "Business/Dashboard/DashboardGrid", component: DashboardGrid, tags: ["autodocs"], parameters: { layout: "fullscreen" } } satisfies Meta<typeof DashboardGrid>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { title: "Dashboard", stats } };
export const Minimal: Story = { args: { stats: stats.slice(0, 1) } };
