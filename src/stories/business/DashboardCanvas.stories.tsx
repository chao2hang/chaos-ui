import type { Meta, StoryObj } from "@storybook/react";
import { DashboardCanvas } from "@/components/business/dashboard-canvas";

const meta = { title: "Business/Dashboard/DashboardCanvas", component: DashboardCanvas, tags: ["autodocs"], parameters: { layout: "fullscreen" }, args: { widgets: [] } } satisfies Meta<typeof DashboardCanvas>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { widgets: [{ id: "1", title: "Revenue KPI", x: 0, y: 0, w: 2, h: 1 }, { id: "2", title: "Chart", x: 2, y: 0, w: 2, h: 1 }] } };
export const WithChange: Story = { args: { widgets: [{ id: "1", title: "Users", x: 0, y: 0, w: 2, h: 1 }], onChange: (w) => { void w; } } };
