import type { Meta, StoryObj } from "@storybook/react";
import { KanbanColumn } from "@/components/business/kanban-column";

const meta = { title: "Business/Kanban/KanbanColumn", component: KanbanColumn, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof KanbanColumn>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { title: "To Do", accent: "#3b82f6", cards: [{ id: "1", title: "Task A", label: "Bug" }, { id: "2", title: "Task B" }, { id: "3", title: "Task C", label: "Feature", assignee: "Alice" }] } };
export const Empty: Story = { args: { title: "Done", accent: "#22c55e" } };
