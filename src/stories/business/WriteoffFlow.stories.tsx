import type { Meta, StoryObj } from "@storybook/react";
import { WriteoffFlow } from "@/components/business/writeoff-flow";

const meta = { title: "Business/Inventory/WriteoffFlow", component: WriteoffFlow, tags: ["autodocs"], parameters: { layout: "padded" }, args: { steps: [] } } satisfies Meta<typeof WriteoffFlow>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { steps: [{ id: "1", name: "Request", status: "done" }, { id: "2", name: "Review", status: "active" }, { id: "3", name: "Approved", status: "pending" }] } };
