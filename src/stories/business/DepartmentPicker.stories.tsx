import type { Meta, StoryObj } from "@storybook/react";
import { DepartmentPicker } from "@/components/business/department-picker";

const meta = { title: "Business/Pickers/DepartmentPicker", component: DepartmentPicker, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof DepartmentPicker>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { options: [{ value: "dept-1", label: "Engineering" }, { value: "dept-2", label: "Design" }, { value: "dept-3", label: "Marketing" }], placeholder: "Select department" } };
export const WithValue: Story = { args: { options: [{ value: "dept-1", label: "Engineering" }], value: "dept-1" } };
