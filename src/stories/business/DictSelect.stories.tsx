import type { Meta, StoryObj } from "@storybook/react";
import { DictSelect } from "@/components/business/dict-select";

const meta = { title: "Business/Pickers/DictSelect", component: DictSelect, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof DictSelect>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { options: [{ value: "1", label: "Option A" }, { value: "2", label: "Option B" }, { value: "3", label: "Option C" }], placeholder: "Select..." } };
export const CategoryCode: Story = { args: { categoryCode: "gender", placeholder: "Select gender" } };
