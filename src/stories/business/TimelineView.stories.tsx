import type { Meta, StoryObj } from "@storybook/react";
import { TimelineView } from "@/components/business/timeline-view";

const meta = { title: "Business/Dashboard/TimelineView", component: TimelineView, tags: ["autodocs"], parameters: { layout: "padded" }, args: { events: [] } } satisfies Meta<typeof TimelineView>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { events: [{ id: "1", date: "2024-07-01", title: "Project kickoff", description: "Team assembled" }, { id: "2", date: "2024-07-05", title: "Design review", description: "Mockups approved" }, { id: "3", date: "2024-07-10", title: "MVP launch" }] } };
