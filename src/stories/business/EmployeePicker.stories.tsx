import type { Meta, StoryObj } from "@storybook/react";
import { EmployeePicker } from "@/components/business/employee-picker";

const meta = { title: "Business/Pickers/EmployeePicker", component: EmployeePicker, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof EmployeePicker>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { options: [{ value: "e1", label: "Alice Wang" }, { value: "e2", label: "Bob Li" }, { value: "e3", label: "Carol Zhang" }], placeholder: "Select employee" } };
export const WithValue: Story = { args: { options: [{ value: "e1", label: "Alice Wang" }], value: "e1" } };
