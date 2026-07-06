import type { Meta, StoryObj } from "@storybook/react";
import { CostCenterPicker } from "@/components/business/cost-center-picker";

const meta = { title: "Business/Pickers/CostCenterPicker", component: CostCenterPicker, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof CostCenterPicker>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { options: [{ value: "CC01", label: "Marketing" }, { value: "CC02", label: "R&D" }, { value: "CC03", label: "Ops" }], placeholder: "Select cost center" } };
export const WithValue: Story = { args: { options: [{ value: "CC01", label: "Marketing" }], value: "CC01" } };
