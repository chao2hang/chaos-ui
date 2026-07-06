import type { Meta, StoryObj } from "@storybook/react";
import { SalesTargetEditor } from "@/components/business/sales-target-editor";

const meta = { title: "Business/Orders/SalesTargetEditor", component: SalesTargetEditor, tags: ["autodocs"], parameters: { layout: "padded" }, args: { rows: [] } } satisfies Meta<typeof SalesTargetEditor>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { rows: [{ id: "1", year: 2024, region: "East", q1: 25000, q2: 30000, q3: 28000, q4: 32000, annual: 115000 }, { id: "2", year: 2024, region: "West", q1: 20000, q2: 22000, q3: 25000, q4: 27000, annual: 94000 }] } };
