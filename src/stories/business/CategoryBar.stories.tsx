import type { Meta, StoryObj } from "@storybook/react";
import { CategoryBar } from "@/components/business/category-bar";

const meta = { title: "Business/Charts/CategoryBar", component: CategoryBar, tags: ["autodocs"], parameters: { layout: "padded" }, args: { data: [] } } satisfies Meta<typeof CategoryBar>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { data: [{ label: "Product A", value: 450, color: "#2563eb" }, { label: "Product B", value: 320, color: "#16a34a" }, { label: "Product C", value: 280, color: "#ca8a04" }] } };
