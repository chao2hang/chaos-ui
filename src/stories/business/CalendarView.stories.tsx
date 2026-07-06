import type { Meta, StoryObj } from "@storybook/react";
import { CalendarView } from "@/components/business/calendar-view";

const meta = { title: "Business/Misc/CalendarView", component: CalendarView, tags: ["autodocs"], parameters: { layout: "padded" }, args: { events: [] } } satisfies Meta<typeof CalendarView>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { events: [{ id: "1", date: "2024-07-15", title: "System upgrade", color: "#dc2626" }, { id: "2", date: "2024-07-20", title: "Team offsite", color: "#2563eb" }] } };
export const WithDateSelect: Story = { args: { events: [{ id: "1", date: "2024-07-10", title: "Deadline" }], onDateSelect: (d) => { void d; } } };
