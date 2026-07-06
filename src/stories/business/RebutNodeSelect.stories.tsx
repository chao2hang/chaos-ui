import type { Meta, StoryObj } from "@storybook/react";
import { RebutNodeSelect } from "@/components/business/rebut-node-select";

const meta = { title: "Business/Files/RebutNodeSelect", component: RebutNodeSelect, tags: ["autodocs"], parameters: { layout: "padded" }, args: { nodes: [] } } satisfies Meta<typeof RebutNodeSelect>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { nodes: [{ id: "1", name: "Reject reason A" }, { id: "2", name: "Reject reason B" }, { id: "3", name: "Reject reason C" }] } };
export const WithCallback: Story = { args: { nodes: [{ id: "1", name: "Reason A" }], onSelect: (id) => { void id; } } };
